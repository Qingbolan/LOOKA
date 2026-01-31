// 发现模块
export { ExplorePage, SearchPage } from './explore'

// 愿望模块
export { TogetherPage, GroupBuyPage, WishCreatePage, WishDetailPage } from './wish'

// 设计模块
export { DesignEditorPage, RecipeDetailPage } from './design'

// 生产模块
export { ProductionPreviewPage } from './production'

// Luka AI 模块
export { LukaPage, LukaChatPage, DesignResultPage, DesignSchemePage, TryOnPage } from './luka'

// 衣柜模块
export { ClosetPage, ClothDetailPage } from './closet'

// 个人中心模块
export { ProfilePage, BodyProfilePage, BodySetupPage } from './profile'
export { default as AddressManagePage } from './profile/AddressManage'
export { default as AddressEditPage } from './profile/AddressEdit'

// 订单模块
export { OrdersPage, OrderDetailPage, ProductDetailPage, ParameterEditPage } from './order'
export { default as CheckoutPage } from './order/Checkout'
export { default as PaymentPage } from './order/Payment'

// 认证模块
export { default as LoginPage } from './auth/Login'
