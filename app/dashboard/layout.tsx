import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="flex h-screen bg-white font-sans text-gray-900">
            {/* Sidebar - Desktop only, always visible */}
            <Sidebar />
            <div className="flex flex-col flex-1 min-w-0">
                <Header />
                <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 bg-white">
                    {children}
                </main>
            </div>
        </div>
    );
}
