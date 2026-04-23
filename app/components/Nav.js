import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { signOut } from 'next-auth/react'
import Logo from './Logo'

export default function Nav({ show, onClose }) {
  const inactiveLink = 'flex items-center gap-2 rounded-lg px-3 py-2 text-slate-700 transition-colors hover:bg-primarySoft'
  const activeLink = `${inactiveLink} bg-primarySoft text-slate-900`
  const inactiveIcon = 'h-5 w-5'
  const activeIcon = `${inactiveIcon} text-primary`
  const router = useRouter()
  const pathname = usePathname()

  async function logout() {
    await router.push('/')
    await signOut()
  }

  const closeOnMobile = () => {
    if (onClose) {
      onClose()
    }
  }

  return (
    <aside
      className={
        (show ? 'left-0' : '-left-full') +
        ' fixed top-0 z-50 h-full w-72 border-r border-slate-200 bg-white p-4 text-sm shadow-xl transition-all md:static md:left-0 md:w-64 md:shadow-none'
      }
    >
      <div className='mb-4 flex items-center justify-between md:block'>
        <Logo />
        <button type='button' onClick={closeOnMobile} className='rounded p-1 text-slate-500 md:hidden'>
          <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor' className='h-6 w-6'>
            <path
              fillRule='evenodd'
              d='M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z'
              clipRule='evenodd'
            />
          </svg>
        </button>
      </div>
      <nav className='flex flex-col gap-2'>
        <Link href={'/products'} onClick={closeOnMobile} className={pathname?.includes('/products') ? activeLink : inactiveLink}>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className={pathname?.includes('/products') ? activeIcon : inactiveIcon}
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z'
            />
          </svg>
          <span>Products</span>
        </Link>
        <Link href={'/categories'} onClick={closeOnMobile} className={pathname?.includes('/categories') ? activeLink : inactiveLink}>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className={pathname?.includes('/categories') ? activeIcon : inactiveIcon}
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z'
            />
          </svg>
          <span>Categories</span>
        </Link>
        <Link href={'/orders'} onClick={closeOnMobile} className={pathname?.includes('/orders') ? activeLink : inactiveLink}>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className={pathname?.includes('/orders') ? activeIcon : inactiveIcon}
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 010 3.75H5.625a1.875 1.875 0 010-3.75z'
            />
          </svg>
          <span>Orders</span>
        </Link>
        <button onClick={logout} className={inactiveLink}>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='w-6 h-6'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75'
            />
          </svg>
          <span>Logout</span>
        </button>
      </nav>
    </aside>
  )
}
