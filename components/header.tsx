// import Image from 'next/image';
// import Link from 'next/link';
// import { cn } from '@/lib/utils';

// const name = 'Alan69359';

// export function Header({ home }: { home?: boolean }) {
//   return (
//     <header className="flex flex-col items-center">
//       {home ? (
//         <>
//           <Image
//             priority
//             src="/images/profile.jpg"
//             className="rounded-full"
//             height={144}
//             width={144}
//             alt=""
//           />
//           <h1 className="text-4xl font-bold mt-4">{name}</h1>
//         </>
//       ) : (
//         <>
//           <Link href="/">
//             <Image
//               priority
//               src="/images/profile.jpg"
//               className="rounded-full"
//               height={108}
//               width={108}
//               alt=""
//             />
//           </Link>
//           <h2 className="text-2xl mt-4">
//             <Link href="/" className="hover:underline">
//               {name}
//             </Link>
//           </h2>
//         </>
//       )}
//     </header>
//   );
// } 