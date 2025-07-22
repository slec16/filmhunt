import React, { useState } from 'react'

type TabItem = {
    id: string;
    label: string;
    content: React.ReactNode;
};

type TabsProps = {
    tabs: TabItem[];
    defaultActiveId?: string;
};

const Tabs = (props: TabsProps) => {
    const { tabs, defaultActiveId } = props
    const [activeTab, setActiveTab] = useState(defaultActiveId || tabs[0]?.id)

    return (
        <div className="w-full">
            {/* Tab headers */}
            <div className="flex justify-center">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        className={`px-4 py-2 text-sm font-medium relative
                            ${activeTab === tab.id
                                ? 'text-orange-500 border-b-2 border-orange-500'
                                : 'text-gray-500 hover:text-gray-700'
                            }`}
                        onClick={() => setActiveTab(tab.id)}
                    >
                        {tab.label}
                        {activeTab === tab.id && (
                            <span className="absolute inset-x-0 bottom-[-2px] h-0.5 bg-orange-500" />
                        )}
                    </button>
                ))}
            </div>

            {/* Tab content */}
            <div className="p-4">
                {tabs.find((tab) => tab.id === activeTab)?.content || null}
            </div>
        </div>
    )
}

export default Tabs