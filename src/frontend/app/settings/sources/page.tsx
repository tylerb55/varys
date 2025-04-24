import { Card, CardHeader, CardTitle } from "@/components/ui/card"

export default function SourcesPage() {
  return (
    <div className="container mx-auto p-6">
      <div className="flex flex-col gap-6">
        <h1 className="text-3xl font-bold tracking-tight">Sources</h1>
        
        <Card>
          <CardHeader>
            <CardTitle>Connect New Source</CardTitle>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
}


