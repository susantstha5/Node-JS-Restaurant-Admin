/**
 * Created by jesseonolememen on 15/07/2017.
 */
var async = require('async'),
	keystone = require('keystone');

var Cart = keystone.list('Cart');

exports.addProductToCart = function (req, res) {
	if (req.body.product !== undefined) {
		Cart.model.findByIdAndUpdate(req.params.id, { $push: { products: req.body.product } }, { safe: true, upsert: true }).exec(function (err, items) {
			if (err) return res.json({error: err });

			res.json({
				results: {
					products: items
				}
			});
		})
	} else {
		res.json({
			error: {
				message: 'No product identifier was found'
			}
		})
	}
}
