'use client'

import { useForm } from "react-hook-form"
import { signIn } from 'next-auth/react'

import { CardTitle, CardDescription, CardHeader, CardContent, Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast"

export function AuthForm() {
  const form = useForm()

  const handleSubmit = form.handleSubmit(async (data) => {
    try {
      await signIn('email', { email: data.email, redirect: false })
      toast({
        title: 'Magic Link Sent',
        description: 'Checj your email for the magic link to login'
      })
    } catch (error) {
      toast({
        title: 'Error',
        description: 'An error occurred. Please try again.'
      })
    }
  })

  return (
    <Card className="mx-auto p-4 max-w-sm">
      <CardHeader className="text-center space-y-1">
        <CardTitle className="text-2xl">Sign In</CardTitle>
        <CardDescription>Enter your email to receive a magic link</CardDescription>
      </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" placeholder="m@example.com" required type="email" {...form.register('email')} />
              </div>
              <Button type="submit" className="w-full">Send Magic Link</Button>
          </CardContent>
        </form>
    </Card>
  )
}
