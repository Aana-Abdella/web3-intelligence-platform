export default function RiskPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-2">Risk Analysis</h1>
      <p className="text-muted-foreground mb-8">
        Analyze wallet exposure to scams, honeypots, mixers, and risky token approvals.
        Search a wallet from the dashboard to view risk details.
      </p>
      <div className="glass rounded-xl p-12 text-center">
        <p className="text-muted-foreground">Risk analysis module — Phase 2</p>
        <p className="text-sm text-muted-foreground mt-2">
          Coming soon: scam token detection, approval risks, blacklist checks, and more.
        </p>
      </div>
    </div>
  );
}
