import { useState } from 'react';
import { ridesService } from '@/services/rides';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';

export default function DatabaseTest() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const runTest = async () => {
    setLoading(true);
    setError(null);
    try {
      const testResult = await ridesService.testDatabaseConnection();
      setResult(testResult);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>Database Connection Test</CardTitle>
        </CardHeader>
        <CardContent>
          <Button 
            onClick={runTest} 
            disabled={loading}
            className="mb-4"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Testing...
              </>
            ) : (
              'Run Database Test'
            )}
          </Button>

          {error && (
            <div className="text-red-500 mb-4">
              Error: {error}
            </div>
          )}

          {result && (
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold">Test Results:</h3>
                <pre className="bg-gray-100 p-4 rounded-md overflow-auto">
                  {JSON.stringify(result, null, 2)}
                </pre>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
} 