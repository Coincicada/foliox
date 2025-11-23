"use client";

import React from 'react';
import { GitHubCalendar } from 'react-github-calendar';
import { Card, CardContent } from '@/components/ui/card';

interface ProofOfWorkSectionProps {
  username: string;
}

export function ProofOfWorkSection({ username }: ProofOfWorkSectionProps) {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const theme = {
    light: ['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39'],
    dark: ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353'],
  };

  return (
    <section className="w-full py-8 sm:py-12 md:py-16 border-b border-border">
      <div className="space-y-6 sm:space-y-8">
        <div>
          <h2 className="font-bold text-2xl md:text-4xl tracking-tight text-foreground">
            Contributions
          </h2>
          <p className="text-muted-foreground mt-1 mb-4">
            Activity over the past year
          </p>
        </div>

        {mounted && (
          <Card className="border-border">
            <CardContent className="p-4 sm:p-6 md:p-8">
              <div className="w-full overflow-x-auto">
                <div className="min-w-[650px] sm:min-w-0 flex justify-center">
                  <GitHubCalendar
                    username={username}
                    fontSize={11}
                    blockSize={13}
                    blockMargin={4}
                    showWeekdayLabels={true}
                    colorScheme="light"
                    theme={{
                      light: theme.light,
                      dark: theme.dark,
                    }}
                    style={{
                      width: '100%',
                      maxWidth: '100%',
                    }}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </section>
  );
}

