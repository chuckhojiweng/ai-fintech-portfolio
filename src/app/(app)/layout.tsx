import BottomNav from "@/components/navigation/BottomNav";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 via-white to-purple-50 pb-20">
      {children}
      <BottomNav />
    </div>
  );
}
