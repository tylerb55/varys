import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { KeywordAnalysis } from "@/components/keywords/keyword-analysis"
import { KeywordTrends } from "@/components/keywords/keyword-trends"
import { KeywordTable } from "@/components/keywords/keyword-table"

export default function KeywordsPage() {
  return (
    <div className="container mx-auto p-6">
      <div className="flex flex-col gap-6">
        <h1 className="text-3xl font-bold tracking-tight">Keywords</h1>

        <div className="grid gap-6 md:grid-cols-2">
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Keyword Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <KeywordAnalysis />
            </CardContent>
          </Card>

          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Keyword Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <KeywordTrends />
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Keyword Explorer</CardTitle>
          </CardHeader>
          <CardContent>
            <KeywordTable />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

