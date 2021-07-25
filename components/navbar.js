import Link from 'next/link';

export default function navBar()
{
    return (
        <nav>
            <Link href='/'>
                <a>Home</a>
            </Link>
            <Link href='/users'>
                <a>Users</a>
            </Link>
            <Link href='/posts'>
                <a>Posts</a>
            </Link>
            <style>
                {`
                    nav{
                        padding-top: 10px;

                    }
                    
                    a{
                        padding: 0 10px;
                    }
                `}
            </style>
            {/* <Link href='/posts/[id]' as={`/posts/${5}`}>
                <a>Post #5</a>
            </Link> */}
        </nav>
    )
}