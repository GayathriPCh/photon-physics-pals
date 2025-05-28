// src/utils/mapReplicaToPhysicist.ts
// eslint-disable-next-line @typescript-eslint/no-explicit-any
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
      wallpaper = 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/f914c869-b03c-4e58-9ff0-d0fb340ba97f/djqle2x-b351a03a-c94e-48fa-866d-bc9363c55ef0.jpg/v1/fill/w_1183,h_676,q_70,strp/a_mysterious_world_ruled_by_quantum_mechanics_by_giorgioquepee8081_djqle2x-pre.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9NzY4IiwicGF0aCI6IlwvZlwvZjkxNGM4NjktYjAzYy00ZTU4LTlmZjAtZDBmYjM0MGJhOTdmXC9kanFsZTJ4LWIzNTFhMDNhLWM5NGUtNDhmYS04NjZkLWJjOTM2M2M1NWVmMC5qcGciLCJ3aWR0aCI6Ijw9MTM0NCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl19.HEpE2bv5Gg5fCmm29K44ewuReYPxEsMXl65V6DAUmW0';
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
  