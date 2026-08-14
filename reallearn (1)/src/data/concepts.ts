import { ConceptItem } from '../types';

export const POPULAR_CONCEPTS: ConceptItem[] = [
  {
    id: 'queue',
    title: 'Queue',
    tagline: "Let's understand Queue through a real-world situation.",
    overviewSummary: "A Queue is a fundamental linear data structure that operates on the First-In, First-Out (FIFO) principle. Elements are inserted at the Rear (Enqueue) and removed from the Front (Dequeue), guaranteeing strict chronological order.",
    keyPoints: [
      {
        title: 'FIFO (First-In, First-Out)',
        description: 'The first element added to the queue will always be the first one to be processed and removed.',
        tag: 'Core Rule',
        icon: 'Clock'
      },
      {
        title: 'Two Distinct Ends',
        description: 'Enqueue happens exclusively at the Rear (tail), while Dequeue happens exclusively at the Front (head).',
        tag: 'Architecture',
        icon: 'ArrowRightLeft'
      },
      {
        title: 'Zero Cut-in Guarantee',
        description: 'Ensures absolute fairness in multi-task scheduling, printer buffers, and message streaming.',
        tag: 'Application',
        icon: 'ShieldCheck'
      },
      {
        title: 'O(1) Time Complexity',
        description: 'Adding to the rear and taking from the front are instant constant-time operations.',
        tag: 'Performance',
        icon: 'Zap'
      }
    ],
    images: [
      {
        id: 'q_img_1',
        url: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?auto=format&fit=crop&w=800&q=80',
        title: 'Supermarket Checkout Line',
        caption: 'Customers stand in a single-file line where the person at the front is serviced first (FIFO).',
        tag: 'Everyday FIFO'
      },
      {
        id: 'q_img_2',
        url: 'https://images.unsplash.com/photo-1530521954074-e64f6810b32d?auto=format&fit=crop&w=800&q=80',
        title: 'Airport Boarding Turnstile',
        caption: 'Passenger tickets are processed in sequence to avoid bottlenecks and ensure fair boarding.',
        tag: 'Fair Access'
      },
      {
        id: 'q_img_3',
        url: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80',
        title: 'Server Message Broker & Spooler',
        caption: 'Distributed servers use message queues (like RabbitMQ/Kafka) to buffer bursts of requests safely.',
        tag: 'Cloud Infrastructure'
      }
    ],
    realWorldExamples: [
      {
        title: 'Printer Task Spooler',
        description: 'When 10 employees print documents at the same time, the printer saves them to a FIFO queue so pages print in exact arrival order.',
        tag: 'Office Hardware',
        icon: 'Printer',
        systemExample: 'CUPS / Windows Print Spooler service'
      },
      {
        title: 'Web Server Request Throttle',
        description: 'During ticket sales or product drops, web servers place incoming HTTP requests into an arrival queue to prevent server crashes.',
        tag: 'Cloud Computing',
        icon: 'Server',
        systemExample: 'Nginx request buffering & Node.js event loop'
      },
      {
        title: 'Customer Support Call Queues',
        description: 'Telephony systems place caller #5 on hold until callers #1 through #4 finish speaking with agents.',
        tag: 'Telecommunications',
        icon: 'Activity',
        systemExample: 'Interactive Voice Response (IVR) systems'
      },
      {
        title: 'Media Streaming Playlists',
        description: 'Spotify and YouTube queues queue up upcoming tracks, advancing the head pointer as each media segment completes.',
        tag: 'Media Apps',
        icon: 'Smartphone',
        systemExample: 'Spotify Up Next queue'
      }
    ],
    category: 'Computer Science',
    difficulty: 'Beginner',
    readTime: '3 min',
    story: {
      title: 'Real-World Story',
      description: "Imagine you're waiting at a ticket counter. The first person in line gets their ticket first.",
      analogyObject: 'Movie Ticket Counter',
      steps: [
        {
          step: 1,
          title: 'Arrival (Enqueue)',
          detail: 'A new person joins the back (Rear) of the line.',
          actor1: '1st',
          actor2: '2nd',
          actor3: '3rd',
          target: 'Counter'
        },
        {
          step: 2,
          title: 'Service (Processing)',
          detail: 'The person at the very front receives their ticket from the counter.',
          actor1: '1st',
          actor2: '2nd',
          actor3: '3rd',
          target: 'Counter'
        },
        {
          step: 3,
          title: 'Departure (Dequeue)',
          detail: 'The 1st person leaves. The 2nd person now steps up to become the new Front.',
          actor1: '2nd',
          actor2: '3rd',
          actor3: '4th',
          target: 'Counter'
        }
      ]
    },
    interactiveVisual: {
      title: 'Interactive Visual',
      subtitle: 'Simulate enqueue and dequeue operations.',
      type: 'queue',
      initialElements: ['A', 'B', 'C'],
      primaryAction: '+ ENQUEUE',
      secondaryAction: '- DEQUEUE',
      primaryLabel: 'FRONT (Dequeue)',
      secondaryLabel: 'REAR (Enqueue)',
      keyTakeaways: [
        'FIFO Principle: First-In, First-Out. Whoever arrived first leaves first.',
        'Enqueue adds an item to the back (Rear).',
        'Dequeue removes an item from the front (Front).',
        'Peek inspects the front element without removing it.'
      ],
      realWorldApplications: [
        {
          title: 'Printer Task Spooler',
          desc: 'Print jobs print in the exact order they were sent from office computers.',
          icon: 'Printer'
        },
        {
          title: 'Web Server Request Buffer',
          desc: 'Incoming HTTP requests are handled sequentially so no user is cut in line.',
          icon: 'Server'
        },
        {
          title: 'Spotify / Music Queue',
          desc: 'The next track in line plays automatically when the current song ends.',
          icon: 'Music'
        }
      ]
    },
    videoWalkthrough: [
      {
        id: 1,
        title: '1. What is a Queue?',
        caption: 'A Queue organizes items sequentially using the First-In, First-Out (FIFO) principle.',
        graphicType: 'analogy',
        illustrationDetails: {
          heading: 'FIFO Principle',
          subheading: 'First-In, First-Out',
          items: ['Items enter at the Rear', 'Items leave at the Front', 'Strict arrival order preserved'],
          accentColor: '#3b82f6'
        }
      },
      {
        id: 2,
        title: '2. Enqueue in Action',
        caption: 'When a new item or user arrives, it is appended to the rear of the line.',
        graphicType: 'animation',
        illustrationDetails: {
          heading: 'Enqueue (+ Addition)',
          subheading: 'Rear Operation',
          items: ['Buffer expands at rear', 'Constant time O(1)', 'No existing elements shifted'],
          accentColor: '#10b981'
        }
      },
      {
        id: 3,
        title: '3. Dequeue Processing',
        caption: 'The front item finishes processing and exits, advancing the next item to the head.',
        graphicType: 'diagram',
        illustrationDetails: {
          heading: 'Dequeue (- Processing)',
          subheading: 'Front Operation',
          items: ['Oldest item serviced', 'Head pointer advances', 'Order guaranteed'],
          accentColor: '#8b5cf6'
        }
      },
      {
        id: 4,
        title: '4. Everyday Applications',
        caption: 'Queues power printer spoolers, web server request buffers, and streaming playlists.',
        graphicType: 'diagram',
        illustrationDetails: {
          heading: 'Everyday Computing',
          subheading: 'Where Queues Live',
          items: ['Printer job spooler', 'Node.js event loop', 'Spotify song queue'],
          accentColor: '#f59e0b'
        }
      }
    ],
    quiz: {
      question: 'In a standard Queue, if items 10, 20, and 30 are added in order, which one is removed first?',
      options: ['30 (The last item added)', '10 (The first item added)', '20 (The middle item)', 'Randomly selected'],
      correctIndex: 1,
      explanation: 'Because a Queue follows First-In, First-Out (FIFO), 10 was enqueued first and will be dequeued first.'
    },
    relatedTopics: ['What is a Stack?', 'Priority Queue', 'Breadth-First Search', 'Circular Buffer']
  },
  {
    id: 'stack',
    title: 'Stack',
    tagline: "Let's understand Stack through a real-world situation.",
    overviewSummary: "A Stack is a linear data structure following the Last-In, First-Out (LIFO) paradigm. Insertion (Push) and removal (Pop) both occur at the same end, called the Top.",
    keyPoints: [
      {
        title: 'LIFO (Last-In, First-Out)',
        description: 'The most recently added element is always the very first one to be removed.',
        tag: 'Core Rule',
        icon: 'Layers'
      },
      {
        title: 'Single Access Point (Top)',
        description: 'You can only push, pop, or inspect (peek) from the top of the stack.',
        tag: 'Architecture',
        icon: 'ArrowUp'
      },
      {
        title: 'Undo / Backtracking Engine',
        description: 'Powers text editor undo (Ctrl+Z), browser back history, and recursive call frames.',
        tag: 'Application',
        icon: 'RotateCcw'
      },
      {
        title: 'Stack Overflow Guard',
        description: 'Pushing too many frames beyond memory limits triggers a stack overflow crash.',
        tag: 'Memory',
        icon: 'AlertTriangle'
      }
    ],
    images: [
      {
        id: 's_img_1',
        url: 'https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&w=800&q=80',
        title: 'Cafeteria Tray Dispenser',
        caption: 'Spring-loaded plate holders where the last plate placed on top is the first taken (LIFO).',
        tag: 'Physical Metaphor'
      },
      {
        id: 's_img_2',
        url: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?auto=format&fit=crop&w=800&q=80',
        title: 'Stack of Pancakes',
        caption: 'To eat or remove a pancake without mess, you always access the top layer first.',
        tag: 'Everyday LIFO'
      },
      {
        id: 's_img_3',
        url: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
        title: 'Software Call Stack & Debugger',
        caption: 'Compilers track active function scopes by pushing activation records into execution memory.',
        tag: 'Developer Tooling'
      }
    ],
    realWorldExamples: [
      {
        title: 'Text Editor Undo (Ctrl+Z)',
        description: 'Every keystroke or edit is pushed onto an undo stack. Pressing Ctrl+Z pops the most recent action to restore the previous state.',
        tag: 'Software Utility',
        icon: 'ShieldCheck',
        systemExample: 'Microsoft Word & VS Code history stacks'
      },
      {
        title: 'Browser Back Button Navigation',
        description: 'Every URL you visit is pushed onto your session stack. Clicking Back pops the current page and reveals the previous URL.',
        tag: 'Web Browsing',
        icon: 'Globe',
        systemExample: 'Chrome / Safari window.history stack'
      },
      {
        title: 'Programming Language Call Stack',
        description: 'When function A calls function B, B is pushed on top. Once B returns, it is popped off and execution resumes in A.',
        tag: 'Runtime Systems',
        icon: 'Cpu',
        systemExample: 'V8 JavaScript engine call stack'
      },
      {
        title: 'Syntax & Bracket Matching',
        description: 'Compilers push opening brackets `(`, `[`, `{` and pop them when matching closing brackets occur to detect syntax errors.',
        tag: 'Compilers',
        icon: 'Zap',
        systemExample: 'Abstract Syntax Tree (AST) tokenizers'
      }
    ],
    category: 'Computer Science',
    difficulty: 'Beginner',
    readTime: '3 min',
    story: {
      title: 'Real-World Story',
      description: "Imagine a tall stack of cafeteria trays or fresh pancakes. The last tray placed on top is the first one taken off.",
      analogyObject: 'Cafeteria Tray Dispenser',
      steps: [
        {
          step: 1,
          title: 'Placing (Push)',
          detail: 'A fresh plate is placed on the very top of the stack.',
          actor1: 'Plate 1',
          actor2: 'Plate 2',
          actor3: 'Plate 3 (Top)',
          target: 'Spring Base'
        },
        {
          step: 2,
          title: 'Accessing (Peek)',
          detail: 'You can only easily see and grab the top plate without knocking the rest over.',
          actor1: 'Plate 1',
          actor2: 'Plate 2',
          actor3: 'Plate 3 (Top)',
          target: 'Spring Base'
        },
        {
          step: 3,
          title: 'Removing (Pop)',
          detail: 'The hungry diner takes the top plate (Plate 3). Plate 2 becomes the new Top.',
          actor1: 'Plate 1',
          actor2: 'Plate 2 (New Top)',
          target: 'Spring Base'
        }
      ]
    },
    interactiveVisual: {
      title: 'Interactive Visual',
      subtitle: 'Simulate push and pop operations on a stack.',
      type: 'stack',
      initialElements: ['Plate 1', 'Plate 2', 'Plate 3'],
      primaryAction: '+ PUSH',
      secondaryAction: '- POP',
      primaryLabel: 'TOP (Push & Pop point)',
      secondaryLabel: 'BOTTOM (Base element)',
      keyTakeaways: [
        'LIFO Principle: Last-In, First-Out. The most recently added item is the first to be removed.',
        'Push adds an element to the top.',
        'Pop removes the current top element.',
        'Stack Overflow happens if you push past maximum physical capacity.'
      ],
      realWorldApplications: [
        {
          title: 'Undo Button (Ctrl+Z)',
          desc: 'Your text editor pops the latest action you took to restore previous state.',
          icon: 'Undo'
        },
        {
          title: 'Browser Back History',
          desc: 'Clicking back pops the current page off the navigation stack.',
          icon: 'Globe'
        },
        {
          title: 'Function Call Stack',
          desc: 'Programming languages track active function calls in memory using a stack.',
          icon: 'Cpu'
        }
      ]
    },
    videoWalkthrough: [
      {
        id: 1,
        title: '1. What is a Stack?',
        caption: 'A Stack organizes items using Last-In, First-Out (LIFO), like a stack of pancakes or trays.',
        graphicType: 'analogy',
        illustrationDetails: {
          heading: 'LIFO Structure',
          subheading: 'Last-In, First-Out',
          items: ['Top is the only open doorway', 'Bottom is sealed', 'New items sit on top'],
          accentColor: '#ec4899'
        }
      },
      {
        id: 2,
        title: '2. Push Operation',
        caption: 'Pushing adds an element directly onto the top of the stack.',
        graphicType: 'animation',
        illustrationDetails: {
          heading: 'Push (+ Top Item)',
          subheading: 'Stacking Up',
          items: ['New item becomes Top', 'Previous top is submerged', 'O(1) Constant time'],
          accentColor: '#3b82f6'
        }
      },
      {
        id: 3,
        title: '3. Pop Operation',
        caption: 'Popping removes the latest top element, revealing the item below it.',
        graphicType: 'diagram',
        illustrationDetails: {
          heading: 'Pop (- Remove Top)',
          subheading: 'Unwinding State',
          items: ['Top item lifted off', 'Submerged item rises to Top', 'Fast retrieval'],
          accentColor: '#8b5cf6'
        }
      },
      {
        id: 4,
        title: '4. Everyday Stacks',
        caption: 'Stack powers Undo buttons, browser history navigation, and code function execution.',
        graphicType: 'diagram',
        illustrationDetails: {
          heading: 'Practical Uses',
          subheading: 'Everyday Software',
          items: ['Ctrl+Z Undo buffer', 'Browser Back button', 'Call Stack in JavaScript'],
          accentColor: '#10b981'
        }
      }
    ],
    quiz: {
      question: 'Which of the following computer actions behaves exactly like a LIFO Stack?',
      options: ['A printer queue', 'The Undo (Ctrl+Z) feature', 'A YouTube video stream buffer', 'Customer service hotline wait time'],
      correctIndex: 1,
      explanation: 'The Undo button reverses the most recent action first (Last-In, First-Out).'
    },
    relatedTopics: ['Queue', 'Recursion & Call Stack', 'Backtracking Algorithms', 'Memory Management']
  },
  {
    id: 'wifi',
    title: 'How does Wi-Fi work?',
    tagline: "Let's understand Wi-Fi through a real-world situation.",
    overviewSummary: "Wi-Fi translates binary digital internet data (1s and 0s) into high-frequency electromagnetic radio waves (2.4 GHz, 5 GHz, or 6 GHz) that travel through the air to your device's wireless antenna and back.",
    keyPoints: [
      {
        title: 'Radio Waves (RF Spectrum)',
        description: 'Data travels as electromagnetic wave oscillations at 2.4 GHz (billions of cycles per second) or 5 GHz.',
        tag: 'Physics',
        icon: 'Radio'
      },
      {
        title: 'Modulation & Demodulation',
        description: 'The router modulates digital 1s and 0s onto wave frequencies, and device antennas decode them.',
        tag: 'Technology',
        icon: 'Activity'
      },
      {
        title: 'Frequency Trade-offs',
        description: '2.4 GHz penetrates walls better but has lower bandwidth; 5 GHz is blazing fast but shorter range.',
        tag: 'Signal',
        icon: 'Wifi'
      },
      {
        title: 'Speed of Light Travel',
        description: 'Radio waves travel through the air at approximately 300,000 km per second, giving microsecond latency.',
        tag: 'Speed',
        icon: 'Zap'
      }
    ],
    images: [
      {
        id: 'w_img_1',
        url: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=800&q=80',
        title: 'Modern High-Speed Wireless Router',
        caption: 'Translates optical fiber internet pulses into high-frequency RF broadcast waves.',
        tag: 'Hardware'
      },
      {
        id: 'w_img_2',
        url: 'https://images.unsplash.com/photo-1516245834210-c4c142787335?auto=format&fit=crop&w=800&q=80',
        title: 'Electromagnetic RF Broadcast Waves',
        caption: 'Invisible radio waves oscillate through the air at billions of cycles per second (GHz).',
        tag: 'Electromagnetism'
      },
      {
        id: 'w_img_3',
        url: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80',
        title: 'Connected Laptops & Smart Devices',
        caption: 'Device antennas modulate and demodulate packet frames with microseconds latency.',
        tag: 'Consumer Tech'
      }
    ],
    realWorldExamples: [
      {
        title: 'Dual-Band 2.4 GHz vs 5 GHz Routers',
        description: 'Routers broadcast 2.4 GHz for long distance through concrete walls and 5 GHz for high-bandwidth 4K video streaming.',
        tag: 'Home Networking',
        icon: 'Smartphone',
        systemExample: 'Wi-Fi 6 (802.11ax) dual-band protocol'
      },
      {
        title: 'Mesh Wi-Fi Whole-Home Beacons',
        description: 'Multiple wireless nodes relay data packets across large offices and multi-story homes without signal drops.',
        tag: 'Network Mesh',
        icon: 'Server',
        systemExample: 'Google Nest Wi-Fi & Eero mesh grids'
      },
      {
        title: 'Microwave Oven Radio Interference',
        description: 'Microwave ovens heat water molecules using 2.45 GHz radiation, which can interfere with older 2.4 GHz Wi-Fi channels.',
        tag: 'Everyday Physics',
        icon: 'Zap',
        systemExample: 'RF spectrum co-channel contention'
      },
      {
        title: 'In-Flight Passenger Wi-Fi',
        description: 'Airplanes connect to ground cell towers or geostationary satellites, distributing local Wi-Fi to passenger seats.',
        tag: 'Aviation',
        icon: 'Plane',
        systemExample: 'Ku-band satellite air-to-ground links'
      }
    ],
    category: 'Everyday Tech',
    difficulty: 'Beginner',
    readTime: '4 min',
    story: {
      title: 'Real-World Story',
      description: "Imagine two people talking with super-fast invisible walkie-talkies. The router translates internet cable data into invisible radio waves, and your phone's antenna decodes them into video and websites.",
      analogyObject: 'Two-Way Radio Station & Morse Code',
      steps: [
        {
          step: 1,
          title: 'Encoding Data',
          detail: 'Your router converts binary 1s and 0s into high-frequency electromagnetic radio waves (2.4 GHz or 5 GHz).',
          actor1: 'Internet Fiber',
          actor2: 'Router Antenna',
          actor3: 'Radio Wave',
          target: 'Airspace'
        },
        {
          step: 2,
          title: 'Traveling Through Air',
          detail: 'The radio waves travel at the speed of light, bouncing off walls and passing through rooms.',
          actor1: 'Router',
          actor2: 'Signal Wave',
          actor3: 'Laptop / Phone',
          target: 'Antenna'
        },
        {
          step: 3,
          title: 'Decoding & Reply',
          detail: 'Your phone antenna catches the wave oscillations, translates them back into pixels and sound, and broadcasts a reply.',
          actor1: 'Phone Antenna',
          actor2: 'Wi-Fi Chip',
          actor3: 'Screen Display',
          target: 'User'
        }
      ]
    },
    interactiveVisual: {
      title: 'Interactive Visual',
      subtitle: 'Simulate radio wave packets, frequency band toggles, and obstacle interference.',
      type: 'wifi',
      initialElements: ['Packet #1', 'Packet #2', 'Packet #3'],
      primaryAction: 'Send Data Packet',
      secondaryAction: 'Toggle 5GHz / 2.4GHz',
      primaryLabel: 'Router (Transmitter)',
      secondaryLabel: 'Smartphone (Receiver)',
      keyTakeaways: [
        'Wi-Fi uses radio frequency bands: 2.4 GHz (longer range, penetrates walls) and 5 GHz / 6 GHz (faster speed, shorter range).',
        'Modulation: Binary data (1s and 0s) is encoded by varying the wave frequency, amplitude, and phase.',
        'Obstacles like concrete walls and metal absorb radio energy, reducing signal strength (RSSI).'
      ],
      realWorldApplications: [
        {
          title: 'Dual-Band Home Routers',
          desc: 'Seamlessly switching devices between 2.4GHz for distance and 5GHz for streaming 4K video.',
          icon: 'Wifi'
        },
        {
          title: 'Mesh Wi-Fi Systems',
          desc: 'Multiple beacon nodes repeating and relaying the radio chatter across large homes.',
          icon: 'Radio'
        },
        {
          title: 'Microwave Interference',
          desc: 'Microwave ovens leak 2.4GHz radiation, which is why old Wi-Fi used to stutter when heating food!',
          icon: 'Zap'
        }
      ]
    },
    videoWalkthrough: [
      {
        id: 1,
        title: '1. What is Wi-Fi?',
        caption: 'Wi-Fi replaces cables with high-frequency electromagnetic radio waves transmitting digital data.',
        graphicType: 'analogy',
        illustrationDetails: {
          heading: 'Radio Wave Modulation',
          subheading: 'Electromagnetic Airwaves',
          items: ['Transmits at 2.4 GHz and 5 GHz', 'Binary bits encoded onto waves', 'Speed of light propagation'],
          accentColor: '#3b82f6'
        }
      },
      {
        id: 2,
        title: '2. Modulation in the Air',
        caption: 'The router converts cable fiber signals into wave oscillations sent through the room.',
        graphicType: 'animation',
        illustrationDetails: {
          heading: 'Signal Transmission',
          subheading: 'Router to Airspace',
          items: ['Amplitude & phase shifts', 'Packets of data frames', 'Omnidirectional broadcast'],
          accentColor: '#f59e0b'
        }
      },
      {
        id: 3,
        title: '3. Device Demodulation',
        caption: 'The micro-antenna on your smartphone detects the oscillation and decodes it back to 1s and 0s.',
        graphicType: 'diagram',
        illustrationDetails: {
          heading: 'Antenna Reception',
          subheading: 'Receiver Processing',
          items: ['Filters out background noise', 'Translates to web pages & video', 'Sends upstream ACK packet'],
          accentColor: '#10b981'
        }
      },
      {
        id: 4,
        title: '4. Frequency Bands & Walls',
        caption: '2.4 GHz passes through walls easily with long waves, while 5 GHz carries more dense data at short range.',
        graphicType: 'diagram',
        illustrationDetails: {
          heading: '2.4 GHz vs 5 GHz',
          subheading: 'Wavelength Trade-off',
          items: ['2.4 GHz = High penetration', '5 GHz = High bandwidth', 'Mesh routers balance both'],
          accentColor: '#8b5cf6'
        }
      }
    ],
    quiz: {
      question: 'Why does a 2.4 GHz Wi-Fi signal reach farther through walls than a 5 GHz signal?',
      options: [
        '2.4 GHz has longer wavelengths that penetrate obstacles more easily',
        '2.4 GHz travels faster than the speed of light',
        '5 GHz only works outdoors',
        '2.4 GHz uses cables instead of radio waves'
      ],
      correctIndex: 0,
      explanation: 'Lower frequencies have longer wavelengths, which experience less absorption when passing through solid materials like drywall and wood.'
    },
    relatedTopics: ['Bluetooth Technology', 'How 5G Works', 'Fiber Optics', 'Radio Frequency Spectrum']
  },
  {
    id: 'gravity',
    title: 'How does gravity work?',
    tagline: "Let's understand Gravity through a real-world situation.",
    overviewSummary: "According to General Relativity, gravity is not an invisible mechanical pull, but the curvature of the 4D fabric of spacetime created by mass and energy. Objects simply travel in straight lines through curved geometry.",
    keyPoints: [
      {
        title: 'Spacetime Curvature',
        description: 'Mass bends the fabric of space and time around it, creating gravitational wells.',
        tag: 'Relativity',
        icon: 'Compass'
      },
      {
        title: 'Orbits are Perpetual Freefall',
        description: 'Planets move sideways so fast that as they fall toward a star, they constantly miss it.',
        tag: 'Mechanics',
        icon: 'RotateCw'
      },
      {
        title: 'Inverse-Square Law',
        description: 'Gravitational attraction drops off with the square of the distance between two bodies.',
        tag: 'Physics Law',
        icon: 'TrendingDown'
      },
      {
        title: 'Time Dilation Effect',
        description: 'Time ticks slower near massive gravitational objects than in deep empty space.',
        tag: 'Astrophysics',
        icon: 'Clock'
      }
    ],
    images: [
      {
        id: 'g_img_1',
        url: 'https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?auto=format&fit=crop&w=800&q=80',
        title: 'Planetary Orbit in Deep Space',
        caption: 'Earth follows the curved spacetime indentation sculpted by the immense mass of the Sun.',
        tag: 'Astrophysics'
      },
      {
        id: 'g_img_2',
        url: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=800&q=80',
        title: 'Astronauts in Orbital Freefall',
        caption: 'In orbit around Earth, astronauts experience weightlessness because they and the space station fall together.',
        tag: 'Space Exploration'
      },
      {
        id: 'g_img_3',
        url: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=800&q=80',
        title: 'Galaxy Gravitational Lens',
        caption: 'Massive cosmic clusters bend and distort the path of background light traveling across deep spacetime.',
        tag: 'General Relativity'
      }
    ],
    realWorldExamples: [
      {
        title: 'GPS Satellite Clock Corrections',
        description: 'Because gravity is weaker 20,000 km in space, GPS satellite clocks tick 45 microseconds faster per day than clocks on Earth. Einstein math corrects this to ensure maps stay accurate!',
        tag: 'Navigation Tech',
        icon: 'Compass',
        systemExample: 'General Relativistic time dilation sync'
      },
      {
        title: 'Oceanic Tides on Coastlines',
        description: 'The gravitational attraction of the Moon pulls Earth oceans into elliptical bulges, producing high and low tides every 12 hours.',
        tag: 'Geophysics',
        icon: 'Activity',
        systemExample: 'Lunar tidal gravitational differential'
      },
      {
        title: 'Deep Space Gravitational Slingshot',
        description: 'NASA spacecraft (like Voyager and Cassini) steer close to Jupiter to steal orbital momentum, accelerating toward interstellar space.',
        tag: 'Aerospace',
        icon: 'Plane',
        systemExample: 'Orbital gravity assist maneuver'
      },
      {
        title: 'Geostationary Weather Satellites',
        description: 'Orbiting at exactly 35,786 km, satellites orbit Earth at the exact same rotational speed as the planet, staying fixed over one city.',
        tag: 'Meteorology',
        icon: 'Globe',
        systemExample: 'Geosynchronous Earth Orbit (GEO)'
      }
    ],
    category: 'Physics',
    difficulty: 'Intermediate',
    readTime: '4 min',
    story: {
      title: 'Real-World Story',
      description: "Imagine placing a heavy bowling ball onto a stretched rubber trampoline. The heavy ball bends the fabric, causing any lighter marble rolled nearby to curve around it.",
      analogyObject: 'Trampoline & Curved Fabric',
      steps: [
        {
          step: 1,
          title: 'Mass Bends Spacetime',
          detail: 'Einstein showed that massive objects like the Sun warp the 4D fabric of spacetime around them.',
          actor1: 'Sun / Heavy Ball',
          actor2: 'Stretched Fabric',
          actor3: 'Curvature Well',
          target: 'Center of Mass'
        },
        {
          step: 2,
          title: 'Motion in Curved Space',
          detail: 'When the Earth moves, it follows the natural straightest path through that curved valley, appearing to orbit.',
          actor1: 'Earth / Marble',
          actor2: 'Orbital Velocity',
          actor3: 'Gravitational Well',
          target: 'Stable Orbit'
        },
        {
          step: 3,
          title: 'Falling vs Orbiting',
          detail: 'If the marble moves fast enough sideways, it falls continuously around the curve without crashing into the center.',
          actor1: 'Forward Speed',
          actor2: 'Inward Pull',
          actor3: 'Centripetal Balance',
          target: 'Perpetual Freefall'
        }
      ]
    },
    interactiveVisual: {
      title: 'Interactive Visual',
      subtitle: 'Simulate gravitational well curvature, mass scaling, and orbital trajectories.',
      type: 'gravity',
      initialElements: ['Planet 1', 'Planet 2'],
      primaryAction: 'Launch Satellite',
      secondaryAction: 'Adjust Star Mass',
      primaryLabel: 'Central Star (Mass M)',
      secondaryLabel: 'Orbiting Body (Velocity V)',
      keyTakeaways: [
        'Gravity is not just a pull; it is the curvature of spacetime caused by mass and energy.',
        'Orbits are perpetual freefall: moving forward so fast that as you fall, you constantly miss the ground.',
        'Gravitational force weakens with the square of the distance (Inverse-Square Law).'
      ],
      realWorldApplications: [
        {
          title: 'GPS Satellite Time Dilation',
          desc: 'GPS satellites tick faster than ground clocks because Earth gravity is weaker in space!',
          icon: 'Satellite'
        },
        {
          title: 'Ocean Tides',
          desc: 'The Moon gravity pulls Earth ocean water into tidal bulges twice a day.',
          icon: 'Waves'
        },
        {
          title: 'Gravitational Slingshot',
          desc: 'NASA Voyager probes stole orbital energy from Jupiter to slingshot into interstellar space.',
          icon: 'Compass'
        }
      ]
    },
    videoWalkthrough: [
      {
        id: 1,
        title: '1. What is Gravity?',
        caption: 'Einstein revealed that gravity is the physical curvature of spacetime around massive objects.',
        graphicType: 'analogy',
        illustrationDetails: {
          heading: 'Spacetime Curvature',
          subheading: 'Mass warps spacetime',
          items: ['Heavy mass sinks the fabric', 'Geodesic straight paths', 'Curvature creates orbit paths'],
          accentColor: '#8b5cf6'
        }
      },
      {
        id: 2,
        title: '2. The Trampoline Metaphor',
        caption: 'Like a bowling ball on a rubber sheet, mass creates a funnel shape around itself.',
        graphicType: 'animation',
        illustrationDetails: {
          heading: 'Gravitational Well',
          subheading: 'Curved Geometry',
          items: ['Sun creates central valley', 'Earth curves along slope', 'Sideways speed maintains orbit'],
          accentColor: '#3b82f6'
        }
      },
      {
        id: 3,
        title: '3. Perpetual Freefall',
        caption: 'Satellites and the Moon never touch down because their horizontal velocity matches their rate of fall.',
        graphicType: 'diagram',
        illustrationDetails: {
          heading: 'Orbital Mechanics',
          subheading: 'Constant Freefall',
          items: ['Sideways velocity v', 'Centripetal balance', 'Stable closed ellipse'],
          accentColor: '#10b981'
        }
      },
      {
        id: 4,
        title: '4. Cosmic Applications',
        caption: 'Gravity powers GPS relativistic clock corrections, oceanic tides, and deep-space probe slingshots.',
        graphicType: 'diagram',
        illustrationDetails: {
          heading: 'Cosmic Impact',
          subheading: 'Real-World Physics',
          items: ['GPS satellite clock syncing', 'Ocean tidal cycles', 'Black hole event horizons'],
          accentColor: '#f59e0b'
        }
      }
    ],
    quiz: {
      question: 'According to General Relativity, why does the Moon orbit the Earth?',
      options: [
        'A magnetic tether pulls it in',
        'It is following the curved geometry of spacetime created by Earth mass',
        'Solar wind pushes it into a circle',
        'Earth atmosphere creates a vacuum funnel'
      ],
      correctIndex: 1,
      explanation: 'Earth mass creates a dip in spacetime, and the Moon is traveling in a straight path along this curved space.'
    },
    relatedTopics: ['Black Holes & Event Horizons', 'Time Dilation', 'Centrifugal Force', 'Escape Velocity']
  },
  {
    id: 'binary_search',
    title: 'Binary Search',
    tagline: "Let's understand Binary Search through a real-world situation.",
    overviewSummary: "Binary Search is an ultra-fast algorithm for finding an element in a sorted list. By checking the midpoint and cutting the remaining range in half at every step, it achieves O(log n) efficiency.",
    keyPoints: [
      {
        title: 'Divide & Conquer',
        description: 'Every single comparison eliminates 50% of the entire remaining dataset instantly.',
        tag: 'Strategy',
        icon: 'Scissors'
      },
      {
        title: 'Strictly Requires Sorted Data',
        description: 'The list must already be ordered numerically or alphabetically for halving to be reliable.',
        tag: 'Prerequisite',
        icon: 'CheckCircle'
      },
      {
        title: 'Logarithmic O(log n) Speed',
        description: 'Searching 1,000,000 sorted items takes at most 20 checks; 1 billion items takes only 30 checks!',
        tag: 'Complexity',
        icon: 'Zap'
      },
      {
        title: 'Three Pointer Pointers (Low, Mid, High)',
        description: 'Calculates mid = (low + high) / 2 and moves low or high depending on target size.',
        tag: 'Mechanism',
        icon: 'Target'
      }
    ],
    images: [
      {
        id: 'b_img_1',
        url: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=800&q=80',
        title: 'Alphabetized Library Bookshelf',
        caption: 'When books are sorted A-Z, you open right to the middle instead of checking every book one by one.',
        tag: 'Physical Analogy'
      },
      {
        id: 'b_img_2',
        url: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=800&q=80',
        title: 'High-Performance Database Index',
        caption: 'SQL database indexes use balanced binary search trees to locate customer records in milliseconds.',
        tag: 'Algorithms'
      },
      {
        id: 'b_img_3',
        url: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=800&q=80',
        title: 'Divide-and-Conquer Decision Fork',
        caption: 'Eliminates 50% of possibilities with every single comparison step.',
        tag: 'Logic & Mathematics'
      }
    ],
    realWorldExamples: [
      {
        title: 'SQL Database Primary Key Index',
        description: 'When looking up a user among 100,000,000 users, B-Tree binary search finds the exact row in just 27 comparisons.',
        tag: 'Database Engineering',
        icon: 'Server',
        systemExample: 'PostgreSQL & MySQL B-Tree index lookup'
      },
      {
        title: 'Git Bisect Bug Tracking',
        description: 'When a regression bug is discovered across 1,000 code commits, `git bisect` uses binary search to pinpoint the exact broken commit in 10 tests.',
        tag: 'DevOps',
        icon: 'Cpu',
        systemExample: 'Git version control bisect command'
      },
      {
        title: 'Digital Dictionaries & Spell Checkers',
        description: 'Word processors instantly check whether typed words exist in a 250,000-word sorted lexicon using logarithmic search.',
        tag: 'Language Processing',
        icon: 'ShieldCheck',
        systemExample: 'Hunspell spellcheck dictionary search'
      },
      {
        title: 'Game Physics Collision Range Finding',
        description: '3D game engines divide scenes into bounding volume hierarchies to quickly detect which objects are colliding.',
        tag: 'Game Development',
        icon: 'Activity',
        systemExample: 'Unreal Engine / Unity BVH raycast'
      }
    ],
    category: 'Computer Science',
    difficulty: 'Beginner',
    readTime: '3 min',
    story: {
      title: 'Real-World Story',
      description: "Imagine looking up 'Smith' in a thick printed phonebook. You don't read page 1 to 1000; you open right to the middle, check if 'Smith' comes before or after, and discard half the book at once!",
      analogyObject: 'Thick Dictionary / Phonebook Split',
      steps: [
        {
          step: 1,
          title: 'Open to the Middle',
          detail: 'Calculate the midpoint between your Low and High page boundaries.',
          actor1: 'Page 1 (Low)',
          actor2: 'Page 500 (Mid)',
          actor3: 'Page 1000 (High)',
          target: 'Midpoint'
        },
        {
          step: 2,
          title: 'Discard Half',
          detail: 'If the target word is alphabetically later, discard pages 1 through 500 completely.',
          actor1: 'Discarded Half (1-500)',
          actor2: 'Remaining Half (501-1000)',
          actor3: 'Target: Smith',
          target: 'New Range'
        },
        {
          step: 3,
          title: 'Repeat Until Found',
          detail: 'Split the remaining 500 pages into 250, then 125, then 60... finding any word in just 10 flips!',
          actor1: 'Step 1: 1000',
          actor2: 'Step 5: 31',
          actor3: 'Step 10: 1 Match',
          target: 'Instant Find'
        }
      ]
    },
    interactiveVisual: {
      title: 'Interactive Visual',
      subtitle: 'Simulate searching for any target number in a sorted array with Low, Mid, and High pointers.',
      type: 'binary_search',
      initialElements: ['3', '8', '14', '27', '35', '42', '59', '71', '88', '99'],
      primaryAction: 'Find Target Number',
      secondaryAction: 'Step Next Halving',
      primaryLabel: 'Low Pointer (Left)',
      secondaryLabel: 'High Pointer (Right)',
      keyTakeaways: [
        'Requires Sorted Data: The items must already be in alphabetical or numerical order.',
        'Logarithmic Time O(log n): Searching 1 million items takes only ~20 checks!',
        'Elimination: Each comparison cuts the remaining search space exactly in half.'
      ],
      realWorldApplications: [
        {
          title: 'Database Index Lookups',
          desc: 'SQL databases find your user profile instantly among 100 million records using B-Trees.',
          icon: 'Database'
        },
        {
          title: 'Git Bisect Bug Hunting',
          desc: 'Engineers binary search through thousands of code commits to find which one broke the app.',
          icon: 'Code'
        },
        {
          title: 'Spellcheckers & Dictionaries',
          desc: 'Instantly verifying whether an English word exists among 200,000 dictionary entries.',
          icon: 'BookOpen'
        }
      ]
    },
    quiz: {
      question: 'In the worst case, how many comparisons does Binary Search need to find an item in a sorted list of 1,024 elements?',
      options: ['1,024 comparisons', '512 comparisons', '10 or 11 comparisons', '1 comparison'],
      correctIndex: 2,
      explanation: 'Since 2^10 = 1024, cutting the list in half each time takes at most 10-11 steps.'
    },
    relatedTopics: ['Linear Search vs Binary Search', 'Binary Search Trees (BST)', 'Big-O Notation', 'QuickSort']
  },
  {
    id: 'dns',
    title: 'How DNS Works',
    tagline: "Let's understand DNS through a real-world situation.",
    overviewSummary: "Domain Name System (DNS) is the internet's decentralized phonebook. It translates human-friendly domain names (like google.com) into machine-routable IP addresses (like 142.250.190.46).",
    keyPoints: [
      {
        title: 'Name to IP Translation',
        description: 'Humans remember names; computers communicate using numerical IP addresses.',
        tag: 'Core Job',
        icon: 'Globe'
      },
      {
        title: 'Hierarchical Tree Architecture',
        description: 'Queries traverse Root (.) ➔ Top-Level Domain (.com) ➔ Authoritative Name Server.',
        tag: 'Hierarchy',
        icon: 'Layers'
      },
      {
        title: 'Recursive & Caching Resolvers',
        description: 'Local ISP and browser caches remember lookups, making repeat visits lightning fast.',
        tag: 'Performance',
        icon: 'Zap'
      },
      {
        title: 'Distributed Redundancy',
        description: '13 global root server clusters guarantee the internet never suffers single-point failure.',
        tag: 'Reliability',
        icon: 'ShieldCheck'
      }
    ],
    images: [
      {
        id: 'd_img_1',
        url: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80',
        title: 'Global Interconnected Internet Network',
        caption: 'Translating human names like google.com into IP addresses routed over global fiber optics.',
        tag: 'Global Network'
      },
      {
        id: 'd_img_2',
        url: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80',
        title: 'Cloud Data Center Root Nameservers',
        caption: '13 distributed root server clusters handling billions of lookups each day.',
        tag: 'Internet Backbone'
      },
      {
        id: 'd_img_3',
        url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
        title: 'Web Browser Address Bar Resolution',
        caption: 'Your browser instantly checks local caches before querying recursive nameservers.',
        tag: 'Web Technology'
      }
    ],
    realWorldExamples: [
      {
        title: 'Content Delivery Network (CDN) Geolocation',
        description: 'When you visit Netflix in Tokyo vs London, Anycast DNS routes your request to the data center physically closest to you.',
        tag: 'Edge Computing',
        icon: 'Globe',
        systemExample: 'Cloudflare & AWS Route 53 Anycast DNS'
      },
      {
        title: 'Network-Wide Ad Blocking (Pi-hole)',
        description: 'DNS sinkholes intercept queries to known tracker and ad domains, returning 0.0.0.0 so ads never load on any device in your home.',
        tag: 'Cybersecurity',
        icon: 'ShieldCheck',
        systemExample: 'Pi-hole & AdGuard Home local DNS sinkhole'
      },
      {
        title: 'Zero-Downtime Server Migrations',
        description: 'When moving websites to new cloud servers, changing DNS A-records seamlessly redirects millions of visitors with zero downtime.',
        tag: 'Cloud DevOps',
        icon: 'Server',
        systemExample: 'TTL-based DNS record switching'
      },
      {
        title: 'Email Anti-Spam Security (DKIM & SPF)',
        description: 'Email providers use DNS TXT records to verify that incoming emails genuinely originated from authorized mail servers.',
        tag: 'Email Infrastructure',
        icon: 'Zap',
        systemExample: 'SPF, DKIM, and DMARC verification records'
      }
    ],
    category: 'Everyday Tech',
    difficulty: 'Intermediate',
    readTime: '4 min',
    story: {
      title: 'Real-World Story',
      description: "Imagine having a contact named 'Alice' on your phone. You don't memorize her 10-digit number; your address book looks it up for you. DNS is the global contact book for the internet.",
      analogyObject: 'The Global Phonebook Directory',
      steps: [
        {
          step: 1,
          title: 'Asking the Local Operator',
          detail: "You type 'google.com'. Your computer asks the local DNS Resolver: 'What is the IP address?'",
          actor1: 'Browser',
          actor2: 'Local Resolver',
          actor3: 'google.com',
          target: 'Recursive Server'
        },
        {
          step: 2,
          title: 'Climbing the Hierarchy',
          detail: 'Resolver asks Root Server (.) -> TLD Server (.com) -> Authoritative Server (google.com nameserver).',
          actor1: 'Root (.)',
          actor2: 'TLD (.com)',
          actor3: 'Auth (google)',
          target: '142.250.190.46'
        },
        {
          step: 3,
          title: 'Direct Connection',
          detail: 'Resolver returns the IP 142.250.190.46 back to your browser, which connects directly.',
          actor1: 'Resolver Cache',
          actor2: 'Browser Handshake',
          actor3: 'Web Page Loaded',
          target: 'Instant Load'
        }
      ]
    },
    interactiveVisual: {
      title: 'Interactive Visual',
      subtitle: 'Simulate the step-by-step query traversal from browser to root, TLD, and authoritative nameserver.',
      type: 'dns',
      initialElements: ['browser', 'resolver', 'root', 'tld', 'auth'],
      primaryAction: 'Resolve Domain Name',
      secondaryAction: 'Simulate Cache Hit',
      primaryLabel: 'Client (User Browser)',
      secondaryLabel: 'Target Server (IP Address)',
      keyTakeaways: [
        'Domain names are for humans (e.g. youtube.com); IP addresses are for computers (e.g. 142.250.80.78).',
        'Hierarchy: Root (.) -> Top-Level Domain (.com/.org) -> Authoritative Server.',
        'DNS Caching speeds up repeat visits by remembering addresses locally.'
      ],
      realWorldApplications: [
        {
          title: 'Instant CDN Routing',
          desc: 'DNS directs you to the closest data center in your city for blazing fast video playback.',
          icon: 'Globe'
        },
        {
          title: 'Private DNS & Ad-blocking',
          desc: 'Pi-hole and NextDNS refuse to resolve tracking domains so ads never even start downloading.',
          icon: 'ShieldCheck'
        },
        {
          title: 'Zero Downtime Website Migrations',
          desc: 'Updating DNS records points millions of users seamlessly to new cloud servers.',
          icon: 'RefreshCw'
        }
      ]
    },
    quiz: {
      question: 'What is the primary role of an Authoritative DNS Server?',
      options: [
        'To hold the ultimate, exact IP record for a specific domain name',
        'To encrypt your Wi-Fi password',
        'To compress images on websites',
        'To manufacture internet cables'
      ],
      correctIndex: 0,
      explanation: 'The Authoritative Name Server is the final source of truth that stores the actual DNS records for that domain.'
    },
    relatedTopics: ['How HTTPS Works', 'IP Addresses (IPv4 vs IPv6)', 'TCP/IP Handshake', 'Content Delivery Networks (CDNs)']
  }
];

export const CATEGORIES = [
  'All',
  'Computer Science',
  'Physics',
  'Everyday Tech',
  'Human Biology',
  'Mathematics'
];

