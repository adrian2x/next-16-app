import { AppSidebar } from '@/components/app-sidebar'
import { NavActions } from '@/components/nav-actions'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb'
import {
  Sidebar,
  SidebarContent,
  SidebarInset,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger
} from '@/components/ui/sidebar'

export default function Page() {
  return (
    <div>
      <title>Dashboard</title>
      <SidebarProvider>
        <div className='flex flex-1'>
          <AppSidebar />
          <SidebarInset>
            <div className='flex flex-1 px-4'>
              <div className='flex flex-1 flex-col gap-2'>
                <header className='flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12'>
                  <div className='flex flex-1 items-center gap-2 px-3'>
                    <SidebarTrigger className='' />
                    {/* <Separator
                  orientation="vertical"
                  className="mr-2 data-[orientation=vertical]:h-4"
                /> */}
                    <Breadcrumb>
                      <BreadcrumbList>
                        <BreadcrumbItem className='hidden md:block'>
                          <BreadcrumbLink href='/'>Home</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator className='hidden md:block' />
                        <BreadcrumbItem>
                          <BreadcrumbPage>Dashboard</BreadcrumbPage>
                        </BreadcrumbItem>
                      </BreadcrumbList>
                    </Breadcrumb>
                  </div>
                  <div className='ml-auto px-3'>
                    <NavActions />
                  </div>
                </header>

                <div className='grid auto-rows-min gap-4 md:grid-cols-3'>
                  <div className='bg-muted/50 aspect-video rounded-xl' />
                  <div className='bg-muted/50 aspect-video rounded-xl' />
                  <div className='bg-muted/50 aspect-video rounded-xl' />
                </div>
                <div className='bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min' />
              </div>

              <div className='hidden md:flex'>
                <SidebarProvider>
                  <Sidebar side='right'>
                    {/* <SidebarHeader></SidebarHeader> */}
                    <SidebarContent>
                      <div></div>
                    </SidebarContent>
                    {/* <SidebarFooter></SidebarFooter> */}
                    <SidebarRail />
                  </Sidebar>
                </SidebarProvider>
              </div>
            </div>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </div>
  )
}
