const userModel = require('../model/user')
const artisanModel = require('../model/artisan')
const hiringModel = require('../model/hiring')


exports.hireArtisan = async (req, res, next) => {
   try {

      const customerId = req.user.id;

      const { artisanId } = req.params;

      const customer = await userModel.findById(customerId);

      if (!customer) {
         return next({
            message: 'Customer not found',
            statusCode: 404
         });
      }

      const artisan = await artisanModel.findById(artisanId);

      if (!artisan) {
         return next({
            message: 'Artisan not found',
            statusCode: 404
         });
      }

      if (customerId === artisanId) {
         return next({
            message: "You cannot hire yourself",
            statusCode: 400
         });
      }

      const hiring = await hiringModel.create({
         customerId,
         artisanId,
         status: 'pending'
      });

      res.status(201).json({
         message: 'Hire request sent successfully',
         data: hiring
      });

   } catch (error) {

      next({
         message: error.message,
         statusCode: 500
      });

   }
};

exports.viewPendingHire = async (req, res, next) => {
   try {
      const { id } = req.user;

      const existingArtisan = await artisanModel.findById(id);

      if (!existingArtisan) {
         return next({
            message: 'Artisan not found',
            statusCode: 404
         })
      }

      const data = {
         id: existingArtisan._id,
         status: "pending"
      }

      const pendingHires = await hiringModel.find({ data });

      if (!pendingHires) {
         return next({
            message: 'No pending Hires',
            statusCode: 404
         })
      }

      res.status(200).json({
         message: 'Pending Hires retrieved successfully',
         data
      })
   } catch (error) {
      next({
         message: error.message,
         statusCode: 500
      })
   }
};

exports.hireStatus = async (req, res, next) => {

   try {

     try {

   const artisanId = req.user.id;

   const { id } = req.params;

   const { status } = req.body;

   const artisan = await artisanModel.findById(artisanId);

   if (!artisan) {
      return next({
         message: "Artisan not found",
         statusCode: 404
      });
   }

   const hire = await hiringModel.findById(id);

   if (!hire) {
      return next({
         message: "Hire request not found",
         statusCode: 404
      });
   }

   if (hire.artisanId?.toString() !== artisanId) {
      return next({
         message: "Unauthorized",
         statusCode: 403
      });
   }

   hire.status = status || hire.status;

   await hire.save();

   res.status(200).json({
      message: `Hire request ${hire.status} successfully`,
      data: hire
   });

} catch (error) {
   next(error);
}

   } catch (error) {

      next({
         message: error.message,
         statusCode: 500
      });

   }
};