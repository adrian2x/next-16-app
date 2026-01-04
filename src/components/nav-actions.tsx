'use client'

import {
  ArrowDown,
  ArrowUp,
  Bell,
  Copy,
  CornerUpLeft,
  CornerUpRight,
  FileText,
  GalleryVerticalEnd,
  LineChart,
  Link,
  LogOutIcon,
  Settings2,
  Trash,
  Trash2,
  UserIcon
} from 'lucide-react'
import * as React from 'react'

import { SignUpAuthForm } from '@/components/sign-up-auth-form'
import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from '@/components/ui/sidebar'
import { useUser } from '@/hooks/use-user'
import { GoogleSignInButton } from './google-sign-in-button'
import { SearchForm } from './search-form'
import { SignInAuthForm } from './sign-in-auth-form'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Dialog, DialogContent, DialogTrigger } from './ui/dialog'
import { FieldSeparator } from './ui/field'

const data = [
  [
    {
      label: 'Customize Page',
      icon: Settings2
    },
    {
      label: 'Turn into wiki',
      icon: FileText
    }
  ],
  [
    {
      label: 'Copy Link',
      icon: Link
    },
    {
      label: 'Duplicate',
      icon: Copy
    },
    {
      label: 'Move to',
      icon: CornerUpRight
    },
    {
      label: 'Move to Trash',
      icon: Trash2
    }
  ],
  [
    {
      label: 'Undo',
      icon: CornerUpLeft
    },
    {
      label: 'View analytics',
      icon: LineChart
    },
    {
      label: 'Version History',
      icon: GalleryVerticalEnd
    },
    {
      label: 'Show delete pages',
      icon: Trash
    },
    {
      label: 'Notifications',
      icon: Bell
    }
  ],
  [
    {
      label: 'Import',
      icon: ArrowUp
    },
    {
      label: 'Export',
      icon: ArrowDown
    }
  ]
]

export function NavActions() {
  const [isOpen, setIsOpen] = React.useState(false)
  const [isSignInDialog, setIsSignInDialog] = React.useState(false)
  const { user, signOut } = useUser()

  return (
    <div className='flex items-center gap-2 text-sm'>
      <SearchForm className='px-4 sm:ml-auto sm:w-auto' />
      {!user && (
        <SignInDialog
          isOpen={isSignInDialog}
          onOpenChange={setIsSignInDialog}
          onSignInUser={() => {
            setIsSignInDialog(false)
          }}
          trigger={<Button>Sign in</Button>}
        />
      )}
      {user && (
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant='ghost'
              size='icon-lg'
              className='cursor-pointer data-[state=open]:bg-accent h-7 w-7'>
              <Avatar>
                <AvatarImage src={user.photoURL} alt={user.displayName} />
                <AvatarFallback>{user.displayName?.[0] ?? <UserIcon />}</AvatarFallback>
              </Avatar>
            </Button>
          </PopoverTrigger>
          <PopoverContent className='w-56 overflow-hidden rounded-lg p-0' align='end'>
            <Sidebar collapsible='none' className='bg-transparent'>
              <SidebarContent>
                {data.map((group, index) => (
                  <SidebarGroup key={index} className='border-b last:border-none'>
                    <SidebarGroupContent className='gap-0'>
                      <SidebarMenu>
                        {group.map((item, index) => (
                          <SidebarMenuItem key={index}>
                            <SidebarMenuButton>
                              <item.icon /> <span>{item.label}</span>
                            </SidebarMenuButton>
                          </SidebarMenuItem>
                        ))}
                      </SidebarMenu>
                    </SidebarGroupContent>
                  </SidebarGroup>
                ))}
                <SidebarGroup>
                  <SidebarGroupContent className='gap-0'>
                    <SidebarMenu>
                      <SidebarMenuItem>
                        <SidebarMenuButton
                          onClick={() => {
                            signOut()
                          }}>
                          <LogOutIcon /> <span>Sign out</span>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    </SidebarMenu>
                  </SidebarGroupContent>
                </SidebarGroup>
              </SidebarContent>
            </Sidebar>
          </PopoverContent>
        </Popover>
      )}
    </div>
  )
}

export function SignInDialog({ trigger, isOpen, onOpenChange, onSignInUser }) {
  const [isSignUp, setSignUp] = React.useState(false)
  return (
    <Dialog
      open={isOpen}
      onOpenChange={(isOpen) => {
        onOpenChange(isOpen)
        setSignUp(false)
      }}>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
      <DialogContent className='sm:max-w-[425px]'>
        <div className='mt-6'>
          <GoogleSignInButton
            onSignIn={(user) => {
              // console.log('signIn', user)
              if (user) {
                onSignInUser?.(user)
              }
            }}
          />
        </div>
        <FieldSeparator className='my-1'>Or</FieldSeparator>
        {isSignUp ? (
          <SignUpAuthForm
            onSignInClick={() => {
              setSignUp(false)
            }}
          />
        ) : (
          <SignInAuthForm
            onSignUpClick={() => {
              setSignUp(true)
            }}
          />
        )}
      </DialogContent>
    </Dialog>
  )
}
