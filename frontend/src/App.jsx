import React, { useState, useEffect } from 'react';
import DashboardShell from './components/DashboardShell';
import { SamudraRakshakSignInPage } from './pages/SamudraRakshakSignInPage';
import { SagarSurakshaOverviewPage } from './pages/SagarSurakshaOverviewPage';
import { SonarMapPage } from './pages/SonarMapPage';
import { MaritimeIncidentPage } from './pages/MaritimeIncidentPage';
import { SonarAnalysisPage } from './pages/SonarAnalysisPage';
import { SagarSurakshaFeedPage } from './pages/SagarSurakshaFeedPage';
import { getHealth } from './services/api';
import { AisProvider } from './context/AisContext';

export default function App() {
  const [healthData, setHealthData] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [operator, setOperator] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [detectionResult, setDetectionResult] = useState(null);
  const [selectedTargetId, setSelectedTargetId] = useState(null);

  useEffect(() => {
    const checkHealth = async () => {
      try {
        const data = await getHealth();
        setHealthData(data);
      } catch (err) {
        console.warn("Backend not yet connected:", err);
      }
    };
    checkHealth();
    const interval = setInterval(checkHealth, 8000);
    return () => clearInterval(interval);
  }, []);

  const handleSignIn = (operatorData) => {
    setOperator(operatorData);
    setIsAuthenticated(true);
    setActiveTab('overview');
  };

  const handleSignOut = () => {
    setIsAuthenticated(false);
  };

  const handleViewOnMap = (targetId) => {
    setSelectedTargetId(targetId);
    setActiveTab('map');
  };

  // 1. Render Samudra Rakshak Stitch Sign In Portal if not authenticated
  if (!isAuthenticated) {
    return (
      <SamudraRakshakSignInPage 
        onSignIn={handleSignIn}
        healthData={healthData}
      />
    );
  }

  // 2. Render Tactical Overview / Landing Page directly
  if (activeTab === 'overview') {
    return (
      <AisProvider>
        <SagarSurakshaOverviewPage 
          onNavigate={setActiveTab}
          operator={operator}
          onSignOut={handleSignOut}
        />
      </AisProvider>
    );
  }

  // 3. Render Dedicated Feature Workspace inside DashboardShell
  return (
    <AisProvider>
      <DashboardShell 
        activeTab={activeTab}
        onTabChange={setActiveTab}
        operator={operator}
        onSignOut={handleSignOut}
      >

        {activeTab === 'map' && (
          <div className="w-full flex-1 flex flex-col p-3 sm:p-5 lg:p-6">
            <SonarMapPage
              detectionResult={detectionResult}
              selectedTargetId={selectedTargetId}
              onSelectTarget={setSelectedTargetId}
              onSwitchToAnalysis={() => setActiveTab('analysis')}
            />
          </div>
        )}

        {activeTab === 'incidents' && (
          <div className="w-full flex-1 flex flex-col p-3 sm:p-5 lg:p-6">
            <MaritimeIncidentPage 
              onSwitchToSonar={() => setActiveTab('analysis')}
            />
          </div>
        )}

        {activeTab === 'analysis' && (
          <div className="w-full flex-1 flex flex-col p-3 sm:p-5 lg:p-6">
            <SonarAnalysisPage 
              healthData={healthData}
              detectionResult={detectionResult}
              setDetectionResult={setDetectionResult}
              selectedDetectionId={selectedTargetId}
              setSelectedDetectionId={setSelectedTargetId}
              onViewOnMap={handleViewOnMap}
            />
          </div>
        )}

        {activeTab === 'feed' && (
          <SagarSurakshaFeedPage 
            onNavigateToMap={() => setActiveTab('map')}
            onNavigateToSonar={() => setActiveTab('analysis')}
          />
        )}
      </DashboardShell>
    </AisProvider>
  );
}
