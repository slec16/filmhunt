import React, { useState } from 'react'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { useNavigate } from 'react-router'

type TabItem = {
    id: string;
    label: string;
    content: React.ReactNode;
};

type TabsProps = {
    tabs: TabItem[];
    defaultActiveId?: string;
    isSeries?: boolean
};

const Tabs = (props: TabsProps) => {
    const { tabs, defaultActiveId, isSeries } = props
    const [activeTab, setActiveTab] = useState(defaultActiveId || tabs[0]?.id)

    const navigate = useNavigate()

    return (
        <div className="w-full h-full flex flex-col flex-1 ">
            {/* Tab headers */}
            <div className="flex justify-between">
                <div></div>
                <div className='flex justify-center'>
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            className={`px-4 py-2 text-sm font-medium relative
                                ${!isSeries && tab.id == "series" ? 'hidden' : ''}
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
                <button onClick={() => navigate(`/${sessionStorage.getItem('previousParams')}`)} className="p-2 rounded-xl bg-orange-500 hover:bg-orange-600 active:bg-orange-700 text-white  transition-all duration-200 ease-in-out transform hover:scale-105 active:scale-95 flex items-center justify-center w-10 h-10">
                    <ArrowBackIcon />
                </button>
            </div>
            {/* Tab content */}
            {/* <div className="h-full flex flex-col flex-1 "> */}
                {tabs.find((tab) => tab.id === activeTab)?.content || null}
            {/* </div> */}
        </div>
    )
}

export default Tabs