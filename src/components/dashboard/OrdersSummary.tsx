
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface OrdersProps {
  pending: number;
  preparing: number;
  ready: number;
  completed: number;
}

export function OrdersSummary({ pending, preparing, ready, completed }: OrdersProps) {
  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Orders Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="flex flex-col items-center justify-center bg-amber-50 rounded-md p-4 border border-amber-100">
            <span className="text-2xl font-bold text-amber-600">{pending}</span>
            <Badge variant="outline" className="mt-1 bg-amber-100 text-amber-800 border-amber-200">
              Pending
            </Badge>
          </div>
          
          <div className="flex flex-col items-center justify-center bg-blue-50 rounded-md p-4 border border-blue-100">
            <span className="text-2xl font-bold text-blue-600">{preparing}</span>
            <Badge variant="outline" className="mt-1 bg-blue-100 text-blue-800 border-blue-200">
              Preparing
            </Badge>
          </div>
          
          <div className="flex flex-col items-center justify-center bg-green-50 rounded-md p-4 border border-green-100">
            <span className="text-2xl font-bold text-green-600">{ready}</span>
            <Badge variant="outline" className="mt-1 bg-green-100 text-green-800 border-green-200">
              Ready
            </Badge>
          </div>
          
          <div className="flex flex-col items-center justify-center bg-gray-50 rounded-md p-4 border border-gray-100">
            <span className="text-2xl font-bold text-gray-600">{completed}</span>
            <Badge variant="outline" className="mt-1 bg-gray-100 text-gray-800 border-gray-200">
              Completed
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
