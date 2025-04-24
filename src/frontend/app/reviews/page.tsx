import { Suspense } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ReviewFilters } from "@/components/reviews/review-filters"
import { ReviewList } from "@/components/reviews/review-list"
import { ReviewListSkeleton } from "@/components/reviews/review-list-skeleton"

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch("http://0.0.0.0:8000/api/reviews")
        const data = await response.json()
        setReviews(data)
        setLoading(false)
      } catch (err) {
  
  return (
    <div className="container mx-auto p-6">
      <div className="flex flex-col gap-6">
        <h1 className="text-3xl font-bold tracking-tight">Reviews</h1>

        <Card>
          <CardHeader>
            <CardTitle>Review Explorer</CardTitle>
          </CardHeader>
          <CardContent>
            <ReviewFilters />
            <Suspense fallback={<ReviewListSkeleton />}>
              <ReviewList />
            </Suspense>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

