const express = require("express");
const router = express.Router();
const Stripe = require("stripe");
const stripe = Stripe("sk_test_51KBHbCEX6KF8JVGhfWRculTksNnhA5l8K1SIUNrlNU6yfeeFTHPIwRYtqY61PG3LMfE9H4LWo0uigt2f1AcBe2J100qsn6YorA");
router.post('/payment', (req, res)=> {
    stripe.charges.create({
        source: req.body.tokenId,
        amount: req.body.amount,
        currency: "usd"
    },(err, success)=> {
        if(err){
            res.status(500).json(err);
        } else{
            res.status(200).json(success);
        }
    })
})

module.exports = router;