import React from 'react'
import Logo from './Logo'
import { Button } from '@/components/ui/Button'

const Footer = () => {
  return (
    <div className='flex w-full items-center p-6 bg-background'>
        <Logo />
        <div className='flex items-center md:ml-auto w-full justify-between md:justify-end text-muted-foreground'>
            <Button variant='ghost'>
                Privacy & Policy
            </Button>
            <Button variant='ghost'>
                Terms & Conditions
            </Button>
        </div>
    </div>
  )
}

export default Footer