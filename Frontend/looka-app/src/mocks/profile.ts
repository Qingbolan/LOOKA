/**
 * 个人中心 Mock 数据
 * 从 Profile.tsx 迁移的硬编码数据
 */

// 愿望状态类型
export type WishStatus = 'collecting' | 'making' | 'done';

// 我的愿望类型
export interface MyWish {
  id: string;
  modelImage: string;
  clothImage: string;
  name: string;
  status: WishStatus;
  wantCount: number;
}

// Profile Tab 名称
export const profileTabs = ['我许的愿', '想要的', '分享'] as const;

// 状态文本映射
export const statusText: Record<WishStatus, string> = {
  collecting: '等人一起',
  making: '制作中',
  done: '已实现',
};

// 状态颜色映射
export const statusColor: Record<WishStatus, string> = {
  collecting: 'bg-primary text-white',
  making: 'bg-amber-500 text-white',
  done: 'bg-emerald-500 text-white',
};

// 我许的愿望
export const myWishes: MyWish[] = [
  {
    id: '1',
    modelImage: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=400',
    clothImage: 'https://images.unsplash.com/photo-1558171813-4c088753af8f?w=200',
    name: '星空渐变长裙',
    status: 'making',
    wantCount: 23,
  },
  {
    id: '2',
    modelImage: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400',
    clothImage: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=200',
    name: '复古格纹西装',
    status: 'collecting',
    wantCount: 18,
  },
  {
    id: '3',
    modelImage: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=400',
    clothImage: 'https://images.unsplash.com/photo-1485968579169-a6b12a6e05ff?w=200',
    name: '极简白衬衫',
    status: 'done',
    wantCount: 45,
  },
];

// 默认头像
export const defaultUserAvatar = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200';

// 默认用户信息
export const defaultUserProfile = {
  name: 'Ava',
  bio: '用 Luka 实现我所有的穿搭梦想 ✨',
  avatar: defaultUserAvatar,
  stats: {
    wishes: 3,
    wants: 8,
    shares: 5,
  },
};
