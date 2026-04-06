export interface AttributeDefinition {
  id: number
  name: string
  weight: number
  description: string
  keywords: { score: number; iclLevel: string; phrases: string[] }[]
}

export const ATTRIBUTES: AttributeDefinition[] = [
  {
    id: 1,
    name: 'Process Transparency',
    weight: 0.25,
    description: 'How clearly the logic, sequence, and method of BMW\'s manufacturing process can be observed.',
    keywords: [
      {
        score: 1.0,
        iclLevel: 'Secret',
        phrases: [
          'complete assembly sequence', 'full production protocol observable', 'end-to-end process visible',
          'entire workflow exposed', 'all stages observable from start to finish', 'manufacturing method fully visible',
          'classified procedure visible', 'proprietary process completely exposed', 'trade process captured',
          'full cycle documented on camera', 'beginning to end workflow', 'entire operational procedure observable',
          'full method sequence visible', 'complete production process captured',
        ],
      },
      {
        score: 0.8,
        iclLevel: 'Strictly Confidential',
        phrases: [
          'sequential steps visible', 'worker follows procedure', 'multi-step process', 'organized workflow',
          'methodical process', 'systematic movement', 'structured task sequence', 'procedural steps observable',
          'task handoff visible', 'coordinated actions', 'repeating sequence', 'protocol being followed',
          'process flow visible', 'production routine visible', 'step-by-step actions',
          'then', 'next', 'followed by', 'after that', 'first then second',
          'retrieves then places', 'picks up then installs',
        ],
      },
      {
        score: 0.5,
        iclLevel: 'Confidential',
        phrases: [
          'stacking boxes', 'moving inventory', 'placing items', 'sorting packages', 'pushing cart',
          'pulling pallet', 'organizing shelves', 'filling orders', 'retrieving items', 'loading dock activity',
          'product handling', 'routine maintenance', 'basic assembly', 'scanning packages',
          'operating standard equipment', 'carrying materials', 'transferring goods', 'moving parts',
          'basic task visible', 'single action observable',
        ],
      },
      {
        score: 0.2,
        iclLevel: 'Not Public',
        phrases: [
          'walking through', 'passing by', 'worker in frame', 'crossing the aisle', 'entering the frame',
          'exiting the frame', 'no specific task visible', 'background activity', 'casual observation',
          'monitoring area', 'brief appearance', 'stationary in background', 'looking around', 'standing idle',
        ],
      },
      {
        score: 0.0,
        iclLevel: 'No Signal',
        phrases: [
          'empty room', 'no activity', 'vacant scene', 'nothing occurring', 'no process visible',
          'area is clear', 'no observable task', 'no operations', 'idle area', 'no workers present',
        ],
      },
    ],
  },
  {
    id: 2,
    name: 'Equipment Visibility',
    weight: 0.20,
    description: 'How identifiable and specific the machinery, tools, and technology visible in the scene are.',
    keywords: [
      {
        score: 1.0,
        iclLevel: 'Secret',
        phrases: [
          'bmw-specific tooling', 'custom-built apparatus', 'proprietary fixture', 'custom jig',
          'bmw assembly tool', 'proprietary robot configuration', 'custom end-of-arm tooling',
          'in-house developed tool', 'patented equipment', 'classified equipment', 'proprietary conveyor design',
          'bmw-engineered system', 'trade-secret machinery', 'one-of-a-kind manufacturing system',
          'unreleased prototype equipment', 'custom automation cell', 'bmw-exclusive tool',
          'proprietary manufacturing system', 'classified apparatus', 'unique bmw equipment',
        ],
      },
      {
        score: 0.8,
        iclLevel: 'Strictly Confidential',
        phrases: [
          'robotic arm', 'cnc machine', 'laser scanner', 'coordinate measuring machine', 'cmm',
          'automated guided vehicle', 'agv', 'vision system', 'plc panel', 'programmable logic controller',
          'servo motor system', 'automated screwdriver', 'laser cutter', '3d scanner', 'multi-axis robot',
          'precision lathe', 'optical measurement system', 'automated inspection system', 'precision instrument',
          'specialized automation', 'advanced robotics', 'high precision equipment',
        ],
      },
      {
        score: 0.5,
        iclLevel: 'Confidential',
        phrases: [
          'forklift', 'conveyor belt', 'pallet jack', 'overhead crane', 'scissor lift', 'boom lift',
          'hydraulic lift', 'dock leveler', 'stretch wrap machine', 'standard press', 'industrial fan',
          'pneumatic tools', 'standard welder', 'compressor', 'pump system', 'industrial conveyor',
          'standard crane', 'basic machinery', 'standard industrial equipment', 'general purpose machine',
        ],
      },
      {
        score: 0.2,
        iclLevel: 'Not Public',
        phrases: [
          'shelf', 'rack', 'bin', 'tote', 'cart', 'pallet', 'hand truck', 'wooden crate', 'cardboard box',
          'wire rack', 'plastic container', 'storage unit', 'rolling cart', 'utility cart', 'basic furniture',
          'standard shelving', 'storage rack', 'filing cabinet', 'simple container', 'basic storage equipment',
        ],
      },
      {
        score: 0.0,
        iclLevel: 'No Signal',
        phrases: [
          'empty floor', 'no equipment visible', 'bare room', 'no machinery', 'nothing in frame',
          'no tools present', 'empty workspace', 'no industrial equipment', 'vacant floor', 'no apparatus visible',
        ],
      },
    ],
  },
  {
    id: 3,
    name: 'Process Stage Sensitivity',
    weight: 0.15,
    description: 'Where in BMW\'s manufacturing pipeline the video scene takes place.',
    keywords: [
      {
        score: 1.0,
        iclLevel: 'Secret',
        phrases: [
          'final assembly line', 'powertrain installation', 'drivetrain assembly', 'engine bay',
          'transmission assembly', 'battery pack assembly', 'electric motor installation',
          'high-voltage assembly area', 'prototype production area', 'r&d manufacturing cell',
          'new model assembly line', 'pre-production line', 'core proprietary process stage',
          'classified production zone', 'bmw-exclusive assembly stage', 'prototype line',
          'unreleased model assembly', 'restricted production zone', 'classified manufacturing stage',
          'core production process',
        ],
      },
      {
        score: 0.8,
        iclLevel: 'Strictly Confidential',
        phrases: [
          'paint booth', 'body shop', 'quality control station', 'stamping area', 'chassis assembly',
          'press shop', 'body-in-white', 'biw', 'coating area', 'surface treatment zone',
          'heat treatment area', 'precision assembly station', 'controlled environment', 'clean room',
          'metrology room', 'advanced manufacturing cell', 'tolerance-critical area', 'inspection station',
          'quality assurance area', 'specialized production cell',
        ],
      },
      {
        score: 0.5,
        iclLevel: 'Confidential',
        phrases: [
          'general production floor', 'assembly area', 'manufacturing zone', 'standard workstation',
          'fabrication area', 'machining area', 'subassembly zone', 'parts kitting', 'component prep area',
          'pre-assembly station', 'general workshop', 'tool room', 'maintenance bay', 'repair station',
          'component assembly', 'manufacturing cell', 'production area', 'standard assembly line',
          'general factory floor', 'basic production zone',
        ],
      },
      {
        score: 0.2,
        iclLevel: 'Not Public',
        phrases: [
          'warehouse', 'storage area', 'loading dock', 'receiving area', 'shipping area', 'dispatch zone',
          'returns area', 'fulfillment area', 'sorting area', 'stockroom', 'supply staging', 'goods-in',
          'goods-out', 'unloading area', 'packing station', 'distribution center', 'logistics area',
          'delivery zone', 'storage facility', 'inventory area',
        ],
      },
      {
        score: 0.0,
        iclLevel: 'No Signal',
        phrases: [
          'outside building', 'parking lot', 'exterior', 'office area', 'cafeteria', 'break room',
          'lobby', 'reception area', 'administrative area', 'non-production zone',
        ],
      },
    ],
  },
  {
    id: 4,
    name: 'Proprietary Method Exposure',
    weight: 0.15,
    description: 'Whether specific tools, calibration instruments, or procedures reveal BMW\'s internal manufacturing methods.',
    keywords: [
      {
        score: 1.0,
        iclLevel: 'Secret',
        phrases: [
          'bmw-specific calibration sequence', 'tolerance check with proprietary instrument',
          'classified work method being performed', 'proprietary torque sequence', 'bmw-exclusive technique',
          'trade secret process visible', 'classified manufacturing method',
          'proprietary quality standard being applied', 'bmw-specific assembly technique',
          'unreleased process method', 'classified operational procedure', 'proprietary method fully exposed',
          'trade secret technique observable', 'bmw-exclusive calibration', 'classified process sequence visible',
        ],
      },
      {
        score: 0.8,
        iclLevel: 'Strictly Confidential',
        phrases: [
          'custom gauge', 'proprietary fixture', 'specialized tool', 'non-standard process',
          'specific calibration instrument', 'custom measuring device', 'specialized jig in use',
          'non-standard assembly method', 'unique tooling being applied', 'proprietary inspection technique',
          'specialized quality procedure', 'custom calibration process', 'non-standard measurement method',
          'proprietary assembly sequence', 'specialized manufacturing technique',
          'custom process being performed', 'unique method observable', 'non-standard procedure visible',
          'proprietary technique in use', 'specialized operational method',
        ],
      },
      {
        score: 0.5,
        iclLevel: 'Confidential',
        phrases: [
          'measuring tape', 'ruler', 'visual inspection', 'routine check', 'standard gauge', 'clipboard',
          'general measurement', 'checklist visible', 'basic measurement tool', 'standard testing equipment',
          'routine audit activity', 'product check', 'general verification', 'standard wrench',
          'basic hand tools', 'routine assembly', 'standard torque application', 'general calibration',
          'basic quality check', 'standard inspection procedure',
        ],
      },
      {
        score: 0.2,
        iclLevel: 'Not Public',
        phrases: [
          'worker present', 'standing near equipment', 'idle', 'waiting', 'watching from distance',
          'supervising', 'hands in pockets', 'no interaction with machinery', 'passing through',
          'stationary worker', 'no tools in use', 'observing without engaging', 'background presence',
          'not performing task', 'walking past equipment',
        ],
      },
      {
        score: 0.0,
        iclLevel: 'No Signal',
        phrases: [
          'no tools visible', 'no process being performed', 'worker not engaged', 'no active task',
          'no method observable', 'no technique visible', 'no procedure in progress', 'no instruments present',
          'worker idle', 'no operational activity',
        ],
      },
    ],
  },
  {
    id: 5,
    name: 'Human Exposure',
    weight: 0.15,
    description: 'How many workers are present and how closely they are interacting.',
    keywords: [
      {
        score: 1.0,
        iclLevel: 'Secret',
        phrases: [
          'full crew visible', 'all stations occupied', 'maximum staffing level', 'full shift on floor',
          'entire team present', 'all personnel active', 'complete workforce visible',
          'shoulder to shoulder', 'hands-on demonstration', 'one guiding another',
          'directly assisting colleague', 'physical knowledge transfer', 'supervisor demonstrating technique',
          'worker being shown process step by step', 'hands-on training in progress', 'guiding hand placement',
          'direct process instruction', 'one-on-one operational coaching', 'showing exact technique',
          'direct method demonstration',
        ],
      },
      {
        score: 0.8,
        iclLevel: 'Strictly Confidential',
        phrases: [
          'multiple workers', 'many staff members', 'large group', 'workers throughout area',
          'numerous employees', 'large crew', 'workers across multiple stations', 'populated floor',
          'high personnel count', 'standing together', 'side by side', 'alongside each other',
          'working in tandem', 'gathered around same item', 'huddled together', 'clustered at station',
          'jointly reviewing', 'facing each other at task', 'grouped around equipment',
          'closely observing same process', 'standing over same item',
        ],
      },
      {
        score: 0.5,
        iclLevel: 'Confidential',
        phrases: [
          'two workers', 'three workers', 'four workers', 'a small group', 'a few workers', 'small crew',
          'handful of employees', 'small team present', 'workers nearby', 'same aisle',
          'passing each other', 'within the same zone', 'adjacent workstation', 'same row', 'same bay',
          'near each other', 'working in proximity', 'within earshot', 'nearby colleague',
          'close but independent tasks', 'same work cell',
        ],
      },
      {
        score: 0.2,
        iclLevel: 'Not Public',
        phrases: [
          'a worker', 'one employee', 'single operator', 'lone technician', 'one person visible',
          'a staff member', 'one individual', 'solitary worker', 'one team member', 'a sole employee',
          'single person on floor', 'one operative', 'individual worker present',
          'workers in different sections', 'individual tasks only', 'no group activity',
          'each at separate workstation', 'workers spread across area', 'no visible interaction',
          'operating independently',
        ],
      },
      {
        score: 0.0,
        iclLevel: 'No Signal',
        phrases: [
          'empty aisle', 'no personnel', 'unoccupied', 'no workers visible', 'deserted area',
          'no staff present', 'area is clear', 'nobody in frame', 'empty floor', 'unmanned',
          'automated only', 'no human presence', 'no operators visible', 'vacant area',
          'no individuals present',
        ],
      },
    ],
  },
  {
    id: 6,
    name: 'Sensitive Data Visibility',
    weight: 0.10,
    description: 'Whether screens, documents, badges, or digital interfaces are visible and readable.',
    keywords: [
      {
        score: 1.0,
        iclLevel: 'Secret',
        phrases: [
          'bmw internal system displayed', 'proprietary software interface', 'classified document visible',
          'restricted data on screen', 'confidential file open on monitor', 'classified work instruction visible',
          'restricted engineering drawing', 'bmw confidential specification', 'unreleased product data visible',
          'prototype specification document', 'classified technical schematic', 'internal bmw database visible',
          'restricted system interface', 'classified production parameters', 'bmw proprietary data on screen',
          'internal specification sheet visible', 'restricted operational data', 'classified bmw interface',
          'proprietary system data visible', 'bmw internal data exposed',
        ],
      },
      {
        score: 0.8,
        iclLevel: 'Strictly Confidential',
        phrases: [
          'computer screen visible', 'monitor showing process data', 'digital readout',
          'software interface visible', 'process parameters on screen', 'identification badge', 'id badge',
          'employee badge', 'keycard', 'access card', 'security badge', 'rfid badge', 'badge scanner',
          'card reader', 'production data displayed', 'work instructions visible', 'sop document open',
          'technical drawing visible', 'blueprint visible', 'schematic on screen', 'engineering drawing',
          'operational metrics displayed', 'kpi dashboard visible', 'process specification visible',
          'system interface displayed',
        ],
      },
      {
        score: 0.5,
        iclLevel: 'Confidential',
        phrases: [
          'barcode visible', 'barcode scanner in use', 'scanning items', 'label visible',
          'part number visible', 'sku visible', 'reading labels', 'product label',
          'standard checklist visible', 'work order visible', 'basic production document',
          'standard form visible', 'routine paperwork', 'general production screen',
          'basic interface visible', 'standard display readable', 'inventory screen',
          'stock management display', 'basic data entry visible', 'standard operational screen',
        ],
      },
      {
        score: 0.2,
        iclLevel: 'Not Public',
        phrases: [
          'screen in background', 'monitor visible but unreadable', 'document present but not visible',
          'badge visible but unreadable', 'display in frame', 'screen too far to read', 'paper on desk',
          'clipboard in scene', 'printed material present', 'digital display present but obscured',
        ],
      },
      {
        score: 0.0,
        iclLevel: 'No Signal',
        phrases: [
          'no screens visible', 'no documents present', 'no data visible', 'no digital displays',
          'no printed materials', 'no badges visible', 'no information systems', 'no monitors in frame',
          'no visible text', 'no readable information',
        ],
      },
    ],
  },
]

export interface EscalationFlagDefinition {
  id: string
  name: string
  categories: { level: string; phrases: string[] }[]
}

export const ESCALATION_FLAGS: EscalationFlagDefinition[] = [
  {
    id: 'third-party',
    name: 'Third Party Presence',
    categories: [
      {
        level: 'Critical',
        phrases: [
          'customer touring final assembly', 'audit team actively reviewing operations',
          'regulatory inspector on site', 'government inspector present', 'press on production floor',
          'media in facility', 'journalist in plant', 'external stakeholder at core process',
          'non-bmw party at powertrain line', 'third party at classified production stage',
          'external access to restricted area', 'outside party observing proprietary method',
          'unauthorized external presence in classified zone', 'external party with direct view of trade process',
        ],
      },
      {
        level: 'High',
        phrases: [
          'guided tour in progress', 'contractor observing operations', 'external consultant on floor',
          'outside engineer present', 'vendor representative near line', 'supplier on production floor',
          'client representative observing', 'non-bmw personnel near equipment',
          'external party watching process', 'outside auditor present', 'third party near assembly area',
          'non-employee in production zone', 'external technician observing',
          'outside party near sensitive equipment', 'consultant reviewing production line',
        ],
      },
      {
        level: 'Medium',
        phrases: [
          'visitor badge visible', 'guest badge', 'visitor pass', 'temporary badge', 'visitor lanyard',
          'person being escorted', 'accompanied by employee', 'guided individual', 'non-employee badge',
          'external person on floor', 'business visitor', 'person from outside organization',
          'visitor being shown around', 'accompanied non-employee', 'escorted guest',
        ],
      },
      {
        level: 'Low',
        phrases: [
          'unfamiliar attire', 'non-standard uniform', 'person in civilian clothes',
          'unrecognized individual', 'out-of-place person', 'unusual dress for environment',
          'different clothing from staff', 'person not in workwear', 'unfamiliar face',
          'individual not in bmw uniform',
        ],
      },
    ],
  },
  {
    id: 'critical-data',
    name: 'Critical Data Detection',
    categories: [
      {
        level: 'Customer Data',
        phrases: [
          'customer name visible', 'customer record', 'customer file', 'client data',
          'customer information on screen', 'client record displayed', 'customer database',
          'client list visible', 'customer account', 'consumer data', 'customer details',
          'client information', 'customer profile visible', 'client file open', 'customer data displayed',
        ],
      },
      {
        level: 'Employee Data',
        phrases: [
          'employee record', 'personnel file', 'employee id', 'staff record', 'personal data visible',
          'employee information', 'hr data', 'personnel data', 'employee details on screen',
          'staff information', 'personal record', 'employee profile', 'workforce data',
          'employee database', 'personal information displayed',
        ],
      },
      {
        level: 'Legal Data',
        phrases: [
          'contract visible', 'legal document', 'agreement on screen', 'contractual terms',
          'legal file open', 'contract terms visible', 'legal agreement', 'binding document',
          'compliance document', 'regulatory filing', 'legal record', 'contractual document',
          'legal data visible', 'compliance data', 'legal terms displayed',
        ],
      },
    ],
  },
]

export const ICL_LEVELS = [
  { name: 'Not Public', min: 0, max: 25, color: 'green', damage: 'Up to ~10,000 EUR', protection: 'Basic Protection', measures: 'Need-to-know access; least privilege access control.' },
  { name: 'Confidential', min: 26, max: 45, color: 'yellow', damage: 'Up to ~1,000,000 EUR', protection: 'Basic Protection', measures: 'Need-to-know access; least privilege access control; mandatory information labeling; secure deletion or disposal.' },
  { name: 'Strictly Confidential', min: 46, max: 70, color: 'orange', damage: 'Up to ~100,000,000 EUR', protection: 'Special Protection', measures: 'All Confidential measures plus mandatory encryption and secure destruction.' },
  { name: 'Secret', min: 71, max: 100, color: 'red', damage: 'Over 100,000,000 EUR', protection: 'Highest Protection', measures: 'All above measures plus explicit approval by the Information Owner prior to any disclosure.' },
] as const
