const successController = async (req, res) => {
    const { tran_id, status } = req.body;
  
    if (status === "VALID") {
      // Process the payment
      // Update database for the order and mark it as paid
      res.status(200).json({
        data: req.body,
        message: "payment complete",
        success: true,
        error: false
      })
    } else {
      res.status(400).json({
        message: "payment failed",
        success: false,
        error: true
      });
    }
  };
  
  module.exports =  successController