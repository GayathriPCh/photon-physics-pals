// src/utils/mapReplicaToPhysicist.ts
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const mapReplicaToPhysicist = (replica: any) => {
    let era = '';
    let wallpaper = '';
    const name = (replica.name || "").toLowerCase();
  
    if (name.includes('einstein')) {
      wallpaper = 'https://images.unsplash.com/photo-1740532428053-30cfd994a91a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bW9tZW50dW0lMjBwaHlzaWNzfGVufDB8MHwwfHx8MA%3D%3D';
    } else if (name.includes('newton')) {
      wallpaper = 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=1080&auto=format&fit=crop';
    } else if (name.includes('richard')) {
      wallpaper = 'https://plus.unsplash.com/premium_photo-1681426558755-71090cebadff?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cXVhbnR1bSUyMHBoeXNpY3N8ZW58MHx8MHx8fDA%3D';
    } else if (name.includes('marie')) {
      wallpaper = 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=1080&auto=format&fit=crop';
    }
    else if (name.includes('bohr')) {
      wallpaper = 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/0fe8f0db-5026-4b34-907b-6566fcc129f3/diurhgr-1eae45c8-a6f2-491f-a008-0a8925a53872.jpg/v1/fill/w_1182,h_676,q_70,strp/freepik__view_the_entanglement_of_a_pair_of_atoms__by_murrtkarrl_diurhgr-pre.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9NzMyIiwicGF0aCI6IlwvZlwvMGZlOGYwZGItNTAyNi00YjM0LTkwN2ItNjU2NmZjYzEyOWYzXC9kaXVyaGdyLTFlYWU0NWM4LWE2ZjItNDkxZi1hMDA4LTBhODkyNWE1Mzg3Mi5qcGciLCJ3aWR0aCI6Ijw9MTI4MCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl19.6-nclpN5elU1tRrjNAIpuP_PBpVUyxqcMWCoNDhtVf8';
    }else if (name.includes('drac')) {
      wallpaper = 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=1080&auto=format&fit=crop';
    }else if (name.includes('photon')) {
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
  