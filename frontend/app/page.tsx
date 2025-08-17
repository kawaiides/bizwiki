import DocumentUploader from '@/components/DocumentUploader';
import DocumentList from '@/components/DocumentList';
import ChatInterface from '@/components/ChatInterface';

export default function HomePage() {
  return (
    <main className="flex h-screen bg-gray-100">
      {/* Left Sidebar for Document Management */}
      <aside className="w-1/3 max-w-sm flex flex-col bg-white border-r border-gray-200">
        <div className="p-4 border-b">
          <h1 className="text-2xl font-bold text-gray-900">BizWiki</h1>
        </div>
        <DocumentUploader />
        <DocumentList />
      </aside>

      {/* Main Chat Area */}
      <section className="flex-grow flex flex-col">
        <ChatInterface />
      </section>
    </main>
  );
}
