import Skeleton from './Skeleton.jsx';
import Card from './Card.jsx';

export default function DashboardSkeleton() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', opacity: 0.9 }}>
      {/* Header Skeleton */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <Skeleton width="280px" height="38px" style={{ marginBottom: '8px' }} />
          <Skeleton width="420px" height="18px" />
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <Skeleton width="130px" height="40px" borderRadius="100px" />
          <Skeleton width="110px" height="40px" borderRadius="100px" />
        </div>
      </div>

      {/* 4 Stat Cards Skeleton */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
        {[1, 2, 3, 4].map((i) => (
          <Card key={i} padding="20px" hover={false}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
              <Skeleton width="110px" height="16px" />
              <Skeleton width="32px" height="32px" circle />
            </div>
            <Skeleton width="90px" height="32px" style={{ marginBottom: '8px' }} />
            <Skeleton width="140px" height="14px" />
          </Card>
        ))}
      </div>

      {/* Charts Row Skeleton */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '16px' }}>
        {/* Growth Graph */}
        <Card padding="24px" hover={false}>
          <Skeleton width="220px" height="22px" style={{ marginBottom: '24px' }} />
          <Skeleton width="100%" height="160px" borderRadius="8px" />
        </Card>

        {/* Activity Matrix */}
        <Card padding="24px" hover={false}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
            <Skeleton width="140px" height="22px" />
            <Skeleton width="80px" height="16px" />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '4px', marginBottom: '16px' }}>
            {Array.from({ length: 49 }).map((_, idx) => (
              <Skeleton key={idx} width="100%" height="28px" borderRadius="4px" />
            ))}
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '6px' }}>
            <Skeleton width="120px" height="12px" />
          </div>
        </Card>
      </div>

      {/* Bottom Row Skeleton */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
        <Card padding="24px" hover={false}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
            <Skeleton width="160px" height="20px" />
            <Skeleton width="80px" height="16px" />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {[1, 2, 3, 4].map((i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <Skeleton width="100px" height="16px" />
                <Skeleton width="100%" height="8px" borderRadius="4px" style={{ flex: 1 }} />
                <Skeleton width="40px" height="16px" />
              </div>
            ))}
          </div>
        </Card>

        <Card padding="24px" hover={false}>
          <Skeleton width="160px" height="20px" style={{ marginBottom: '20px' }} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {[1, 2, 3, 4].map((i) => (
              <div key={i} style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <Skeleton width="32px" height="32px" circle />
                <div style={{ flex: 1 }}>
                  <Skeleton width="80%" height="16px" style={{ marginBottom: '4px' }} />
                  <Skeleton width="40%" height="12px" />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
