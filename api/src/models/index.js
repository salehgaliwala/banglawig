const { console } = require('../helpers');
const Product = require('./products/Product.model');

const Categories = require('./categories/Categories.model');

const Attributes = require('./attributes/Attributes.model');
const AttributeValues = require('./attributes/AttributeValues.model');

const Variations = require('./variations/Variations.model');
const VariationAttributes = require('./variations/VariationAttributes.model');
const VariationDetails = require('./variations/VariationDetails.model');

const Images = require('./uploads/Images.model');

const Reviews = require('./reviews/reviews.model');

const User = require('./users/User.model');
const UserRole = require('./users/UserRole.model');
const ProCatTax = require('./categories/Categories-Product-relation.model');
const Menu = require('./menu/Menu.model');
const Brand = require('./brands/Brands.model');
const Claims = require('./claims/claims.model');
const Cart = require('./carts/cart.model');
const CartItem = require('./carts/cartItems.model');

const Order = require('./orders/order.model');
const OrderAddress = require('./orders/orderAddress.model');
const OrderItems = require('./orders/orderItems.model');

const Shipping = require('./shipping/shipping.model');
const Messages = require('./messages/messages.model');

const Pages = require('./pages/Pages.model');


// // sync 
// Product.sync({alter: true}).then((e)=>{
// 	console('creating Products table');
// });
// Attributes.sync({alter: true});
// AttributeValues.sync({alter: true});
// Variations.sync({alter: true});
// VariationAttributes.sync({alter: true});
// VariationDetails.sync({alter: true});
// Images.sync({alter: true});
// Reviews.sync();
// User.sync({alter: true});
// UserRole.sync({alter: true});
// Categories.sync({alter: true})
// ProCatTax.sync({alter: true})
// Brand.sync({alter: true});
// Menu.sync({alter: true});
// Cart.sync({alter: true});
// CartItem.sync({alter: true});
// Order.sync({alter: true});
// OrderItems.sync({alter: true});
// OrderAddress.sync({alter: true});
// Shipping.sync({alter: true});
// Messages.sync({alter: true});
// Pages.sync({alter: true});



// relations
Product.hasMany(Variations, {
	as: 'Variations',
	foreignKey: 'productId'
});
Product.hasMany(Images, {
	as: 'Images',
	foreignKey: 'caseId'
})
Product.hasOne(Brand,{
	foreignKey: 'id',
	sourceKey: 'brandId'
})
// Variations.belongsTo(Product)
Variations.hasMany(VariationAttributes, {
	as: 'VariationAttributes',
	foreignKey: 'variationId'
})



Variations.hasOne(VariationDetails, {
	as: 'VariationDetail',
	foreignKey: 'variationId'
})

VariationAttributes.hasOne(AttributeValues, {
	as: 'attributeValue',
	foreignKey: 'id',
	sourceKey: 'attributeValueId'
})
VariationAttributes.hasOne(Attributes, {
	foreignKey: 'id',
	sourceKey: 'attributeId'
})

Variations.hasMany(Images, {
	as: 'Images',
	foreignKey: 'caseId'
})

User.hasOne(UserRole, {
	as: 'userRole',
	foreignKey: 'id',
	sourceKey: 'roleId'
});


Attributes.hasMany(AttributeValues, {
	as: 'attributeValue',
	foreignKey: 'attributeId'
})

AttributeValues.belongsTo(VariationAttributes, {
	as: 'attributeValue',
	foreignKey: 'attributeValueId'
})


// relate parent to child categories
Categories.hasMany(Categories, {
  as: 'children',
  foreignKey: 'parentId',
});

Product.belongsToMany(Categories, {
	through: ProCatTax
})
Categories.belongsToMany(Product, {
	through: ProCatTax
})

Menu.hasMany(Menu, {
	as: 'children',
	foreignKey: 'parentId'
});

Cart.hasMany(CartItem, {
	as: 'cartItems',
	foreignKey: 'cartId'
});

CartItem.hasOne(Product, {
	as: 'product',
	sourceKey: 'productId',
	foreignKey: 'id'
})
CartItem.hasOne(Variations, {
	as: 'variation',
	sourceKey: 'variationId',
	foreignKey: 'id'
})

Order.hasMany(OrderItems, {
	as: 'orderItems',
	foreignKey: 'orderId'
});

OrderItems.hasOne(Product, {
	as: 'product',
	sourceKey: 'productId',
	foreignKey: 'id'
})
OrderItems.hasOne(Variations, {
	as: 'variation',
	sourceKey: 'variationId',
	foreignKey: 'id'
})

Order.hasOne(OrderAddress, {
	as: 'orderAddress',
	foreignKey: 'orderId'
});



module.exports = {
	Product,
	ProCatTax,
	Attributes,
	AttributeValues,
	Variations,
	VariationAttributes,
	VariationDetails,
	Images,
	Reviews,
	User,
	UserRole,
	Categories,
	Menu,
	Brand,
	Claims,
	Cart,
	CartItem,
	Order,
	OrderAddress,
	OrderItems,
	Shipping,
	Messages,
	Pages
}