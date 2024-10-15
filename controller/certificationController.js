const Certificate = require('../model/certificateModel');
const USER = require('../model/userModel')
exports.createCertificate = async(req,res, next)=>{

     try {
          const { certificateName,overViews, issuer, startDate,duration,status } = req.body;
          const certificate =  new Certificate({
               certificateName,overViews, issuer, startDate,duration, status 
          })
          const certificateCreated =  await certificate.save();
        

         res.status(200).json({
          certificate:certificateCreated,
          msg:'Certificate Created !'
         })
     } catch (error) {
          res.status(500).send({
               msg:'certificate not created',
               error

          })
     }

}

exports.getCertificate = async(req,res,next)=>{

     try {
            // working here pagination, search, filter and also sorting
    const {page=1, limit=10, sortBy='dsc', search = '', status, startDate} = req.query;
     let filter = {}
     if(status) filter.status = status;
     if(startDate) filter.startDate = {$gte: new Date(startDate)};
     if(search)   filter.certificateName = {$regex:search, $option:'1'}  
     const certification = await Certificate.find(filter).sort({[sortBy]:order === 'asc' ? 1: -1}).skip((page-1)*limit).limit(parseInt(limit));

     const total =  await Certificate.countDocuments(filter);
     res.status(200).json({
          total, page, limit, certification
     })

     } catch (error) {
          res.status(500).json({
               msg:'not getting data', error
          }) 
     }

}

exports.createUserController = async()=>{
     try {
          const {name, email, password  } = req.body;
          const user =  new USER({
               name, email, password 
          })
          const userCreated =  await user.save();
        

         res.status(200).json({
          userCreated,
          msg:'Certificate Created !'
         })
     } catch (error) {
          res.status(500).send({
               msg:'certificate not created',
               error

          })
     }
}

exports.enrollUserController = async(req,res, next)=>{
try {
const {userId, certificateId, startDate} = req.body;
const endDate = new Date(startDate);
const certificate = await Certificate.findById(certificateId).select('duration');
endDate().setMonth(endDate.getMonth())+certificate.duration()
const userCertificate = await Cetificate.findById({certificateId});
await userCertifucate.save()
userCertificate.users.push({userId, startDate, enddate})
res.satus(200).json({
     msg:"user Enrolled successfully"
})


} catch (error) {
     res.satus(500).json({
          msg:"user not Enrolled successfully"
     })
}


}
exports.editCertificate = async(req,res,next)=>{
     try {
          const {id  } = req.params;
         const {certificateName, issuer, overViews}  = req.body;
         const certificate = await Certificate.findByIdAndUpdate(id,{certificateName, issuer, overViews},{new:true});
          
         res.status(200).json({
          certificate,
          msg:'updated successfully !'
         })
     } catch (error) {
          res.status(500).send({
               msg:'certificate not updated',
               error

          })
     }
}

exports.getActiveCertificate = async( )=>{
     try {
         const {search = '', sortBy="startDate", order = 'asc', page=1, limit=10} =req.query;
         let filter = {status:"publish","users.userId":req.userId }
     
          if(search){
               filter.certificateName = {$regex: search, $options:'1'}
          }
          const certificate = await Certificate.find(filter).sort({[sortBy]:order ==='asc' ?1:-1}).skip((page-1)*limit).limit(parseInt(limit));
          

         res.status(200).json({
          certificate ,
          msg:'All active users !'
         })
     } catch (error) {
          res.status(500).send({
               msg:'certificate not created',
               error
     
          })
     }
}


