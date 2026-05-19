const messageModel = require('../model/message');
const artisanModel = require('../model/artisan');

exports.sendMessage = async (req, res, next) => {

   try {

      const senderId = req.user.id;

      const { artisanId } = req.params;

      const { message } = req.body;

      const artisan = await artisanModel.findById(artisanId);

      if (!artisan) {
         return next({
            message: 'Artisan not found',
            statusCode: 404
         });
      }

      const newMessage = await messageModel.create({
         senderId,
         receiverId: artisanId,
         message
      });

      res.status(201).json({
         message: 'Message sent successfully',
         data: newMessage
      });

   } catch (error) {
      next({
         message: error.message,
         statusCode: 500
      });

   }
};

exports.getArtisanMessages = async (req, res, next) => {
    try {
        const { id } = req.user;

        const findArtisan = await artisanModel.findById(id);

        if (!findArtisan) {
        return next({
            message: 'Artisan not found',
            statusCode: 404
        });
        }

        // Find messages sent TO this artisan
        const messages = await messageModel.find({
        receiverId: id
        }).populate('senderId', 'firstName lastName email');

        if (!messages.length) {
        return next({
            message: 'No messages found',
            statusCode: 404
        });
        }

        res.status(200).json({
        message: 'Messages retrieved successfully',
        count: messages.length,
        data: messages
        });
    } catch (error) {
        next({
            message: error.message,
            statusCode: 500
        })
    }
}