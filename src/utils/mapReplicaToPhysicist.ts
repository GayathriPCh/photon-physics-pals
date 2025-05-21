// src/utils/mapReplicaToPhysicist.ts
export const mapReplicaToPhysicist = (replica: any) => {
    let era = '';
    let wallpaper = '';
    const name = (replica.name || "").toLowerCase();
  
    if (name.includes('einstein')) {
      era = '1879-1955';
      wallpaper = 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1080&auto=format&fit=crop';
    } else if (name.includes('newton')) {
      era = '1643-1727';
      wallpaper = 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=1080&auto=format&fit=crop';
    } else if (name.includes('hawking')) {
      era = '1942-2018';
      wallpaper = 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=1080&auto=format&fit=crop';
    } else if (name.includes('photon')) {
      era = 'Timeless';
      wallpaper = 'https://images.unsplash.com/photo-1614332287897-cdc485fa562d?q=80&w=1080&auto=format&fit=crop';
    }
  
    return {
      id: replica.uuid,
      name: replica.name,
      era,
      specialty: replica.shortDescription || replica.short_description || '',
      bio: replica.purpose || '',
      avatar: replica.profileImage || replica.profile_image || '',
      wallpaper,
      topics: replica.tags || [],
      knownFor: replica.greeting || replica.introduction || '',
    };
  };
  