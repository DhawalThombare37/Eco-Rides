export interface Route {
  from: string;
  to: string[];
  area: string;
}

export const puneRoutes: Route[] = [
  {
    from: 'Hinjewadi',
    to: ['Kothrud', 'Baner', 'Aundh'],
    area: 'tech'
  },
  {
    from: 'Magarpatta',
    to: ['Baner', 'Kothrud', 'Viman Nagar'],
    area: 'tech'
  },
  {
    from: 'Viman Nagar',
    to: ['Hinjewadi', 'Kalyani Nagar', 'Koregaon Park'],
    area: 'tech'
  },
  {
    from: 'FC Road',
    to: ['Pune University', 'Deccan', 'Shivajinagar'],
    area: 'education'
  },
  {
    from: 'Kothrud',
    to: ['COEP', 'Karve Nagar', 'Erandwane'],
    area: 'education'
  },
  {
    from: 'Camp',
    to: ['Shivajinagar', 'Deccan', 'Koregaon Park'],
    area: 'commercial'
  },
  {
    from: 'Koregaon Park',
    to: ['Deccan', 'Camp', 'Bund Garden'],
    area: 'commercial'
  }
]; 