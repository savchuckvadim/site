'use client';

import { supaAuth } from '@/modules/services/db/supabase/model';
import { FormEvent, useState } from 'react';


import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import LoadingScreen from '@/modules/shared/LoadingScreen/ui/LoadingScreen';

const ForgetForm = ({
    className,
    ...props
}: React.ComponentPropsWithoutRef<"div">) => {

    const [email, setEmail] = useState('');
    // const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {

        e.preventDefault();

        setError('')
        if (!isLoading) {
            setIsLoading(true)

            try {
               await supaAuth.forget(email);

               window.location.href = '/';

            } catch (err: any) {

                setError(err.message || 'Ошибка аутентификации');
            }
        }
        // setIsLoading(false)
    };

    return (<div className={cn("flex flex-col gap-6", className)} {...props}>
        {!isLoading
            ? <Card>
                <CardHeader className='pb-1'>
                    <CardTitle className="text-2xl">Forgot</CardTitle>
                    <CardDescription>
                        Enter your email and we will send you a password
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit}>
                        <div className="flex flex-col gap-6">
                            {error && (
                                <div className="text-red-500 text-sm">
                                    {error}
                                </div>
                            )}

                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="m@example.com"
                                    required
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>

                            <Button type="submit" className="w-full mt-5 mb-7">

                                remind me
                            </Button>
                            {/* <Button variant="outline" className="w-full">
                            Login with Google
                        </Button> */}
                        </div>
                        <div className="mt-4 text-center text-sm">
                            Don&apos;t have an account?{" "}
                            <a href="/auth/signup"
                                className="underline underline-offset-4"
                                onClick={() => setIsLoading(true)}
                            >
                                Sign up
                            </a>
                        </div>
                    </form>
                </CardContent>
            </Card>
            : <LoadingScreen />
        }
    </div>
    )
}
export default ForgetForm