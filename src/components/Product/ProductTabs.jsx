import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const specLabels = {
  wheelSize: 'Wheel Size',
  frameType: 'Frame',
  gearCount: 'Gears',
  brakeType: 'Brakes',
  weight: 'Weight',
  ageRange: 'Age Range',
  suspension: 'Suspension',
  motor: 'Motor',
  battery: 'Battery',
  range: 'Range',
};

export default function ProductTabs({ product }) {
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'specifications', label: 'Specifications' },
    { id: 'whats-in-box', label: "What's in the Box" },
    { id: 'assembly', label: 'Assembly & Care' }
  ];

  // Build specs array from product
  const specsArray = Object.entries(product.specs)
    .map(([key, value]) => ({
      label: specLabels[key] || key,
      value,
      key,
    }))
    .filter((s) => s.value);

  return (
    <div className="mt-8 sm:mt-12">
      {/* Tab Navigation */}
      <div className="border-b border-gray-200 mb-6">
        <div className="flex overflow-x-auto scrollbar-hide -mb-px">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 sm:px-6 py-3 text-sm sm:text-base font-semibold whitespace-nowrap transition-colors border-b-2 ${
                activeTab === tab.id
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* About This Product */}
              <section>
                <h3 className="text-lg sm:text-xl font-bold text-dark mb-3">About this Product</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  {product.shortDescription}
                </p>

                {/* Who is this for */}
                <div className="bg-gray-50 rounded-xl p-4 mb-4">
                  <h4 className="font-semibold text-dark mb-3">Perfect For:</h4>
                  <ul className="space-y-2 text-sm text-gray-700">
                    {product.specs.ageRange && (
                      <li className="flex items-start gap-2">
                        <span className="text-primary font-bold">•</span>
                        <span><strong>Age:</strong> {product.specs.ageRange}</span>
                      </li>
                    )}
                    <li className="flex items-start gap-2">
                      <span className="text-primary font-bold">•</span>
                      <span><strong>Riding Style:</strong> {getCategoryDescription(product.category)}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary font-bold">•</span>
                      <span><strong>Skill Level:</strong> Beginner to Intermediate</span>
                    </li>
                  </ul>
                </div>

                {/* Key Benefits */}
                <div>
                  <h4 className="font-semibold text-dark mb-3">Key Benefits:</h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {getKeyBenefits(product).map((benefit, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm text-gray-700">
                        <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </section>
            </div>
          )}

          {activeTab === 'specifications' && (
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-dark mb-4">Technical Specifications</h3>
              <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                <div className="divide-y divide-gray-200">
                  {specsArray.map((spec, i) => (
                    <motion.div
                      key={spec.key}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.2, delay: i * 0.03 }}
                      className="flex items-center justify-between px-4 py-3 text-sm hover:bg-gray-50 transition-colors"
                    >
                      <span className="text-gray-600 font-medium">{spec.label}</span>
                      <span className="font-semibold text-dark text-right">{spec.value}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'whats-in-box' && (
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-dark mb-4">Package Contents</h3>
              <div className="space-y-3">
                <BoxItem
                  icon="🚲"
                  title="Bicycle (80% Pre-assembled)"
                  description="Front wheel, handlebars, and pedals need attachment"
                />
                <BoxItem
                  icon="📖"
                  title="User Manual & Warranty Card"
                  description="Step-by-step assembly guide with illustrations"
                />
                <BoxItem
                  icon="🔧"
                  title="Basic Toolkit"
                  description="All tools needed for assembly included"
                />
                <BoxItem
                  icon="🔔"
                  title="Safety Accessories"
                  description="Reflectors and bell included"
                />
              </div>

              <div className="bg-blue-50 border border-blue-200 p-4 rounded-xl mt-6 text-sm text-blue-800">
                <strong>Note:</strong> Some models may include additional accessories like basket, water bottle holder, or kickstand. Check product specifications above.
              </div>
            </div>
          )}

          {activeTab === 'assembly' && (
            <div className="space-y-6">
              <section>
                <h3 className="text-lg sm:text-xl font-bold text-dark mb-4">Assembly Instructions</h3>
                <div className="space-y-4">
                  <AssemblyStep
                    number="1"
                    title="Unpack carefully"
                    description="Remove all packaging materials and check contents against box list"
                    time="2 minutes"
                  />
                  <AssemblyStep
                    number="2"
                    title="Attach front wheel"
                    description="Align the fork and secure with quick-release or nuts provided"
                    time="5 minutes"
                  />
                  <AssemblyStep
                    number="3"
                    title="Install handlebars"
                    description="Insert stem into frame, align, and tighten securely"
                    time="3 minutes"
                  />
                  <AssemblyStep
                    number="4"
                    title="Attach pedals"
                    description="Right pedal (R) turns clockwise, left pedal (L) turns counter-clockwise"
                    time="3 minutes"
                  />
                  <AssemblyStep
                    number="5"
                    title="Adjust seat height"
                    description="Set appropriate height and tighten seat post clamp"
                    time="2 minutes"
                  />
                </div>

                <div className="bg-purple-50 border border-purple-200 p-4 rounded-xl mt-6">
                  <div className="flex items-center gap-3">
                    <svg className="w-10 h-10 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    <div>
                      <p className="font-semibold text-purple-900">Need Assembly Help?</p>
                      <p className="text-sm text-purple-700">Book a free video call with our assembly expert</p>
                    </div>
                  </div>
                </div>
              </section>

              <section>
                <h3 className="text-lg sm:text-xl font-bold text-dark mb-4">Maintenance & Care</h3>
                <div className="space-y-4">
                  <MaintenanceTip
                    icon="🔧"
                    title="Regular Checks (Weekly)"
                    items={[
                      'Check tire pressure (PSI marked on tire sidewall)',
                      'Test brakes for responsiveness',
                      'Ensure all bolts are tight',
                      'Lubricate chain if dry'
                    ]}
                  />
                  <MaintenanceTip
                    icon="🛠️"
                    title="First Service (After 1 month)"
                    items={[
                      'Professional tune-up recommended',
                      'Free at any BCH service center',
                      'Covers brake adjustment, gear tuning, wheel truing'
                    ]}
                  />
                  <MaintenanceTip
                    icon="🧼"
                    title="Cleaning"
                    items={[
                      'Wipe down with damp cloth after rides',
                      'Use mild soap for stubborn dirt',
                      'Avoid high-pressure water jets',
                      'Dry thoroughly to prevent rust'
                    ]}
                  />
                </div>
              </section>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

// Helper Components
function BoxItem({ icon, title, description }) {
  return (
    <div className="flex items-start gap-3 bg-gray-50 p-4 rounded-xl">
      <span className="text-3xl">{icon}</span>
      <div>
        <h4 className="font-semibold text-dark mb-1">{title}</h4>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
    </div>
  );
}

function AssemblyStep({ number, title, description, time }) {
  return (
    <div className="flex gap-4">
      <div className="flex-shrink-0 w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center font-bold">
        {number}
      </div>
      <div className="flex-1">
        <h4 className="font-semibold text-dark mb-1">{title}</h4>
        <p className="text-sm text-gray-600 mb-2">{description}</p>
        <span className="inline-block text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
          ⏱️ Time: {time}
        </span>
      </div>
    </div>
  );
}

function MaintenanceTip({ icon, title, items }) {
  return (
    <div className="bg-gray-50 p-4 rounded-xl">
      <div className="flex items-start gap-3 mb-3">
        <span className="text-2xl">{icon}</span>
        <h4 className="font-semibold text-dark">{title}</h4>
      </div>
      <ul className="space-y-1.5 ml-11">
        {items.map((item, index) => (
          <li key={index} className="text-sm text-gray-700 flex items-start gap-2">
            <span className="text-primary mt-1">•</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

// Helper Functions
function getCategoryDescription(category) {
  const descriptions = {
    kids: 'Casual riding, learning to cycle, park activities',
    geared: 'Multi-terrain riding, fitness, daily commute',
    mountain: 'Off-road trails, rough terrain, adventure cycling',
    city: 'Urban commute, errands, leisure rides',
    electric: 'Eco-friendly commute, long distances, pedal-assist'
  };
  return descriptions[category] || 'Versatile everyday cycling';
}

function getKeyBenefits(product) {
  const benefits = [
    `Durable ${product.specs.frameType} frame built to last`,
    'Designed for Indian road conditions'
  ];

  if (product.specs.brakeType) {
    benefits.push(`Reliable ${product.specs.brakeType} braking system`);
  }

  if (product.specs.gearCount && product.specs.gearCount !== 'Single Speed') {
    benefits.push(`${product.specs.gearCount} for versatile riding`);
  }

  if (product.specs.suspension) {
    benefits.push('Suspension for comfortable rides on rough roads');
  }

  if (product.category === 'kids') {
    benefits.push('Safety features perfect for young riders');
  }

  if (product.category === 'electric') {
    benefits.push('Eco-friendly electric motor for effortless riding');
  }

  benefits.push('Easy assembly with included tools');
  benefits.push('Backed by 1-year warranty');

  return benefits;
}
