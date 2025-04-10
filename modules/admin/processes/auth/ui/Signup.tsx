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

const SignUpForm = ({
    className,
    ...props
}: React.ComponentPropsWithoutRef<"div">) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setError('')
        if (!isLoading) {
            setIsLoading(true)
            if (password !== passwordConfirm) {
                setError('Passwords do not match');
                setIsLoading(false)
                return;
            }
            try {
                const { user, session } = await supaAuth.register(email, password);

                if (user && user?.email_confirmed_at && user.role === 'admin') {
                    return window.location.href = '/admin/projects';
                } else if (user && !user?.user_metadata.email_verified) {

                    return window.location.href = '/auth/confirm';
                } {

                    return window.location.href = '/';
                }
            } catch (err: any) {
                setError(err.message || 'Ошибка аутентификации');
            }
        }
        setIsLoading(false)
    };

    return (<div className={cn("flex flex-col gap-6", className)} {...props}>
        {!isLoading
            ? <Card>
                <CardHeader className='pb-2'>
                    <CardTitle className="text-2xl">Sign up</CardTitle>
                    <CardDescription>
                        Enter your email and password for registration
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
                            <div className="grid gap-2">
                                <Label htmlFor="password">Enter Password</Label>
                                <Input id="password" type="password" required
                                    onChange={(e) => setPassword(e.target.value)}
                                />

                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="confirm-password">Confirm Password</Label>

                                <Input id="confirm-password" type="password" required
                                    onChange={(e) => setPasswordConfirm(e.target.value)}
                                />
                            </div>
                            <Button type="submit" className="w-full mt-2" >
                                Sign up
                            </Button>

                        </div>
                        <div className="mt-4 text-center text-sm">
                            Have an account?{" "}
                            <a href="/auth/login" className="underline underline-offset-4"
                                onClick={() => setIsLoading(true)}
                            >
                                Login
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
export default SignUpForm