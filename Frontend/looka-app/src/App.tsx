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
} from '@/pages'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Main Tabs */}
        <Route path="/" element={<ExplorePage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/together" element={<TogetherPage />} />
        <Route path="/luka" element={<LukaPage />} />
        <Route path="/luka/chat" element={<LukaChatPage />} />
        <Route path="/closet" element={<ClosetPage />} />
        <Route path="/closet/:id" element={<ClothDetailPage />} />
        <Route path="/orders" element={<OrdersPage />} />
        <Route path="/profile" element={<ProfilePage />} />

        {/* Detail Pages */}
        <Route path="/product/:id" element={<ProductDetailPage />} />
        <Route path="/order/:id" element={<OrderDetailPage />} />
        <Route path="/try-on" element={<TryOnPage />} />
        <Route path="/body-setup" element={<BodySetupPage />} />
        <Route path="/design-result" element={<DesignResultPage />} />
        <Route path="/group-buy/:id" element={<GroupBuyPage />} />
        <Route path="/design-scheme" element={<DesignSchemePage />} />
        <Route path="/parameter-edit" element={<ParameterEditPage />} />
        <Route path="/body-profile" element={<BodyProfilePage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
