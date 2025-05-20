"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  CheckCircle2,
  ArrowRight,
  Zap,
  Twitter,
  Linkedin,
  Facebook,
  Github,
  ImageIcon,
  CodeIcon,
  MessageCircle,
} from "lucide-react"

export default function LandingPage() {

  return (
    <div className="flex min-h-[100dvh] flex-col">
      {/* Header */}
      <header className="sticky px-2 lg:px-4 top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Zap className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">StreamLine</span>
          </div>

          <div className="flex items-center gap-4">
            <Link href="/sign-in" className="text-sm font-medium hover:underline underline-offset-4">
              Sign In
            </Link>
            <Button >
              <Link href="/sign-up">
                Sign Up
              </Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <Badge className="inline-flex">New Release</Badge>
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl xl:text-6xl/none">
                    Streamline Your Workflow Like Never Before
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground text-sm sm:text-base md:text-xl">
                    Boost productivity and simplify collaboration with our all-in-one platform. Designed for teams of
                    all sizes.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-2">
                  <Button size="lg" className="w-full sm:w-auto" asChild>
                    <Link href="#pricing">Start Free Trial</Link>
                  </Button>
                </div>
                <div className="flex flex-col xs:flex-row items-start xs:items-center xs:space-x-4 space-y-2 xs:space-y-0 text-xs sm:text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    <span>No credit card required</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    <span>14-day free trial</span>
                  </div>
                </div>
              </div>
              <div className="mx-auto lg:mx-0 w-full max-w-[550px]">
                <Image
                  src="/mainIcon.png"
                  width={550}
                  height={550}
                  alt="Hero Image"
                  className="w-full aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last lg:aspect-square"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tighter sm:text-5xl">Features</h2>
                <p className="max-w-[900px] text-muted-foreground text-sm sm:text-base md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Use Ai for your own good.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 sm:grid-cols-2 lg:grid-cols-3">
              <Card className="p-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <ImageIcon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold">Image generation</h3>
                <p className="text-sm sm:text-base text-muted-foreground">
                  generate image of your chooise.
                </p>
              </Card>
              <Card className="p-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <CodeIcon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold">Code generation</h3>
                <p className="text-sm sm:text-base text-muted-foreground">
                  generate code for your website, ship faster.
                </p>
              </Card>
              <Card className="p-6 sm:col-span-2 lg:col-span-1">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <MessageCircle className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold">Chat assist</h3>
                <p className="text-sm sm:text-base text-muted-foreground">
                  Get answere to your question.
                </p>
              </Card>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-2xl font-bold tracking-tighter sm:text-5xl">
                  Simple, Transparent Pricing
                </h2>
                <p className="max-w-[900px] text-muted-foreground text-sm sm:text-base md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Choose the plan that's right for you and your team.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
              <Card className="p-6">
                <div className="mb-4 space-y-2">
                  <h3 className="text-xl sm:text-2xl font-bold">Starter</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground">This will get you started</p>
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl sm:text-3xl font-bold">$0(free)</span>
                    <span className="text-xs sm:text-sm text-muted-foreground">/month per user</span>
                  </div>
                </div>
                <ul className="mb-6 space-y-2 text-xs sm:text-sm">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    <span>Up to 5 Chat Assist</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    <span>Up to 5 Image Generation</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    <span>Up to 5 Code Generation</span>
                  </li>
                </ul>
                <Button className="w-full text-xs sm:text-sm">Get Started</Button>
              </Card>
              <Card className="p-6 border-primary relative">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-primary text-primary-foreground text-xs">Most Popular</Badge>
                </div>
                <div className="mb-4 space-y-2">
                  <h3 className="text-xl sm:text-2xl font-bold">Professional</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground">Ideal for growing businesses.</p>
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl sm:text-3xl font-bold">$20</span>
                    <span className="text-xs sm:text-sm text-muted-foreground">/month per user</span>
                  </div>
                </div>
                <ul className="mb-6 space-y-2 text-xs sm:text-sm">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    <span>Unlimited Chat Assist</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    <span>Unlimited Image Generation</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    <span>Unlimited Code Generation</span>
                  </li>
                </ul>
                <Button className="w-full text-xs sm:text-sm">Get Started</Button>
              </Card>
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tighter sm:text-5xl">
                  Ready to Streamline Your Workflow?
                </h2>
                <p className="max-w-[900px] text-muted-foreground text-sm sm:text-base md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Join thousands of satisfied customers and transform how your team works today.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full border-t bg-background px-4">
        <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
          <div className="flex items-center gap-2">
            <Zap className="h-6 w-6 text-primary" />
            <span className="text-lg font-bold">StreamLine</span>
          </div>
          <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-6 md:px-0">
            <div className="flex items-center gap-4">
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                <Twitter className="h-4 w-4" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                <Linkedin className="h-4 w-4" />
                <span className="sr-only">LinkedIn</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                <Facebook className="h-4 w-4" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                <Github className="h-4 w-4" />
                <span className="sr-only">GitHub</span>
              </Link>
            </div>
          </div>
        </div>
        <div className="container py-4 md:py-6">
          <p className="text-center text-xs sm:text-sm text-muted-foreground">
            © {new Date().getFullYear()} StreamLine. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
