import { useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import {
  ExplorePage,
  TogetherPage,
  LukaPage,
  LukaChatPage,
  ClosetPage,
  ClothDetailPage,
  BodySetupPage,
  OrdersPage,
  ProfilePage,
  ProductDetailPage,
  OrderDetailPage,
  TryOnPage,
  DesignResultPage,
  GroupBuyPage,
  DesignSchemePage,
  ParameterEditPage,
  BodyProfilePage,
  SearchPage,
  CheckoutPage,
  PaymentPage,
  AddressManagePage,
  AddressEditPage,
  LoginPage,
  // 新增页面
  DesignEditorPage,
  RecipeDetailPage,
  WishCreatePage,
  WishDetailPage,
  ProductionPreviewPage,
} from '@/pages'
import { ErrorBoundary } from '@/components/feedback/ErrorBoundary'
import { ToastProvider } from '@/components/feedback/Toast'
import { LoadingProvider } from '@/components/feedback/Loading'
import { AuthGuard, OptionalAuth } from '@/components/auth/AuthGuard'
import { useAuthStore } from '@/store'

function App() {
  const { checkAuth } = useAuthStore()

  // 初始化时检查认证状态
  useEffect(() => {
    checkAuth()
  }, [checkAuth])

  // 监听登出事件（由 API 拦截器触发）
  useEffect(() => {
    const handleLogout = () => {
      useAuthStore.getState().logout()
    }
    window.addEventListener('auth:logout', handleLogout)
    return () => window.removeEventListener('auth:logout', handleLogout)
  }, [])

  return (
    <ErrorBoundary>
      <ToastProvider>
        <LoadingProvider>
          <BrowserRouter>
            <Routes>
              {/* 认证页面 */}
              <Route path="/auth/login" element={<LoginPage />} />

              {/* 主要标签页 - 无需登录 */}
              <Route path="/" element={<OptionalAuth><ExplorePage /></OptionalAuth>} />
              <Route path="/search" element={<OptionalAuth><SearchPage /></OptionalAuth>} />
              <Route path="/together" element={<OptionalAuth><TogetherPage /></OptionalAuth>} />
              <Route path="/luka" element={<OptionalAuth><LukaPage /></OptionalAuth>} />
              <Route path="/luka/chat" element={<OptionalAuth><LukaChatPage /></OptionalAuth>} />

              {/* 需要登录的页面 */}
              <Route path="/closet" element={<AuthGuard><ClosetPage /></AuthGuard>} />
              <Route path="/closet/:id" element={<AuthGuard><ClothDetailPage /></AuthGuard>} />
              <Route path="/orders" element={<AuthGuard><OrdersPage /></AuthGuard>} />
              <Route path="/profile" element={<AuthGuard><ProfilePage /></AuthGuard>} />

              {/* 商品详情 - 无需登录 */}
              <Route path="/product/:id" element={<OptionalAuth><ProductDetailPage /></OptionalAuth>} />
              <Route path="/group-buy/:id" element={<OptionalAuth><GroupBuyPage /></OptionalAuth>} />

              {/* 设计模块 */}
              <Route path="/design/editor" element={<OptionalAuth><DesignEditorPage /></OptionalAuth>} />
              <Route path="/design/editor/:id" element={<OptionalAuth><DesignEditorPage /></OptionalAuth>} />
              <Route path="/design/recipe/:id" element={<OptionalAuth><RecipeDetailPage /></OptionalAuth>} />

              {/* 愿望模块 */}
              <Route path="/wish/create" element={<AuthGuard><WishCreatePage /></AuthGuard>} />
              <Route path="/wish/:id" element={<OptionalAuth><WishDetailPage /></OptionalAuth>} />

              {/* 生产模块 */}
              <Route path="/production/:wishId" element={<AuthGuard><ProductionPreviewPage /></AuthGuard>} />

              {/* 订单相关 - 需要登录 */}
              <Route path="/order/:id" element={<AuthGuard><OrderDetailPage /></AuthGuard>} />
              <Route path="/checkout" element={<AuthGuard><CheckoutPage /></AuthGuard>} />
              <Route path="/payment" element={<AuthGuard><PaymentPage /></AuthGuard>} />

              {/* 地址管理 - 需要登录 */}
              <Route path="/address" element={<AuthGuard><AddressManagePage /></AuthGuard>} />
              <Route path="/address/edit" element={<AuthGuard><AddressEditPage /></AuthGuard>} />

              {/* 其他功能页面 */}
              <Route path="/try-on" element={<OptionalAuth><TryOnPage /></OptionalAuth>} />
              <Route path="/body-setup" element={<AuthGuard><BodySetupPage /></AuthGuard>} />
              <Route path="/body-profile" element={<AuthGuard><BodyProfilePage /></AuthGuard>} />
              <Route path="/design-result" element={<OptionalAuth><DesignResultPage /></OptionalAuth>} />
              <Route path="/design-scheme" element={<OptionalAuth><DesignSchemePage /></OptionalAuth>} />
              <Route path="/parameter-edit" element={<OptionalAuth><ParameterEditPage /></OptionalAuth>} />
            </Routes>
          </BrowserRouter>
        </LoadingProvider>
      </ToastProvider>
    </ErrorBoundary>
  )
}

export default App
