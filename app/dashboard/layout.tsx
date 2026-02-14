import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="min-h-screen bg-white flex flex-col font-sans text-gray-900">
            <Header />
            <div className="flex flex-1 h-[calc(100vh-64px)] overflow-hidden">
                <Sidebar />
                <main className="flex-1 overflow-y-auto p-8 bg-white">
                    {children}
                </main>
            </div>
        </div>
    );
}
