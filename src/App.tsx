import React, { useState } from 'react';
import {
  LayoutGrid,
  Wrench,
  AlertCircle,
  FileText,
  Droplets,
  Bell,
  Maximize,
  User,
  ChevronDown,
  ChevronRight
} from 'lucide-react';
import TaskView from './views/TaskView';
import ObjectConfigView from './views/ObjectConfigView';
import TemplateConfigView from './views/TemplateConfigView';
import PlanConfigView from './views/PlanConfigView';
import WorkOrderView from './views/WorkOrderView';
import DeviceAlarmView from './views/DeviceAlarmView';

export default function App() {
  const [activeMenu, setActiveMenu] = useState('task');
  const [objectActiveTab, setObjectActiveTab] = useState<'device' | 'environment'>('device');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [expandedMenus, setExpandedMenus] = useState<Record<string, boolean>>({
    inspection: false,
    maintenance: false,
    alarm: false,
    meter: false,
    water: false,
  });

  const toggleMenu = (menuKey: string) => {
    setExpandedMenus(prev => {
      const isCurrentlyExpanded = prev[menuKey];
      const newState: Record<string, boolean> = {
        inspection: false,
        maintenance: false,
        alarm: false,
        meter: false,
        water: false,
      };
      newState[menuKey] = !isCurrentlyExpanded;
      return newState;
    });
  };

  const getMenuClass = (menuId: string) => {
    return activeMenu === menuId
      ? "pl-[44px] py-[10px] text-[13px] text-[#2c73eb] bg-[#eaf1fe] cursor-pointer relative font-medium"
      : "pl-[44px] py-[10px] text-[13px] text-gray-600 hover:text-blue-600 cursor-pointer transition-colors";
  };

  return (
    <div className="flex h-screen flex-col overflow-hidden text-[14px] font-sans antialiased text-[#333]">
      {/* Header */}
      <header className="flex items-center justify-between h-[60px] bg-[#D4E4FE] px-4 shrink-0 shadow-sm z-10">
        <div className="flex items-center h-full">
          <h1 className="text-[18px] font-bold text-[#222] mr-8 tracking-wide">数字能源管理平台</h1>
          <nav className="flex space-x-8 h-full items-center text-[15px] font-medium text-[#555]">
            <a href="#" className="hover:text-blue-600 transition-colors">能源分析</a>
            <a href="#" className="hover:text-blue-600 transition-colors">配电监控</a>
            <a href="#" className="hover:text-blue-600 transition-colors">给水监控</a>
            <a href="#" className="hover:text-blue-600 transition-colors">能耗管控</a>
            <a href="#" className="flex items-center h-full text-[#111] font-bold border-b-[3px] border-[#2c73eb] px-1 translate-y-[2px]">智慧运维</a>
            <a href="#" className="hover:text-blue-600 transition-colors">报表管理</a>
            <a href="#" className="hover:text-blue-600 transition-colors">基础管理</a>
            <a href="#" className="flex items-center hover:text-blue-600 transition-colors">更多 <ChevronDown size={16} className="ml-1 opacity-70"/></a>
          </nav>
        </div>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <select className="appearance-none bg-white border border-gray-200 text-[13px] py-1.5 pl-3 pr-8 rounded-full focus:outline-none shadow-sm cursor-pointer text-gray-700">
              <option>xx大学xx校区</option>
            </select>
            <ChevronDown size={14} className="absolute right-3 top-2 text-gray-400 pointer-events-none" />
          </div>
          <div className="flex space-x-2.5">
            <button className="w-8 h-8 bg-white/80 hover:bg-white rounded-full flex items-center justify-center text-gray-500 shadow-sm"><Bell size={18} /></button>
            <button className="w-8 h-8 bg-white/80 hover:bg-white rounded-full flex items-center justify-center text-gray-500 shadow-sm"><Maximize size={18} /></button>
            <button className="w-8 h-8 bg-[#cbe0ff] hover:bg-blue-200 border border-blue-200 rounded-full flex items-center justify-center text-blue-600 shadow-sm"><User size={18} /></button>
          </div>
        </div>
      </header>

      {/* Body Area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-[200px] bg-white flex-shrink-0 border-r border-[#e5e7eb] flex flex-col pt-3 overflow-y-auto space-y-1 select-none">
          <div className="flex items-center px-5 py-3 cursor-pointer hover:bg-[#f8f9fa] text-gray-700">
            <LayoutGrid size={18} className="mr-3 opacity-80" />
            <span className="text-[14px]">全景监控</span>
          </div>
          
          <div className="flex flex-col">
            <div 
              className="flex items-center justify-between px-5 py-3 cursor-pointer hover:bg-[#f8f9fa] text-[#222]"
              onClick={() => toggleMenu('inspection')}
            >
              <div className="flex items-center">
                <LayoutGrid size={18} className="mr-3 opacity-90" />
                <span className="text-[14px] font-medium">巡检管理</span>
              </div>
              {expandedMenus['inspection'] ? <ChevronDown size={16} className="text-gray-400" /> : <ChevronRight size={16} className="text-gray-400" />}
            </div>
            
            {expandedMenus['inspection'] && (
              <div className="flex flex-col flex-1 pb-1">
                <div onClick={() => setActiveMenu('task')} className={getMenuClass('task')}>
                  {activeMenu === 'task' && <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#2c73eb]" />}
                  巡检任务管理
                </div>
                <div onClick={() => setActiveMenu('object')} className={getMenuClass('object')}>
                  {activeMenu === 'object' && <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#2c73eb]" />}
                  巡检对象配置
                </div>
                <div onClick={() => setActiveMenu('template')} className={getMenuClass('template')}>
                  {activeMenu === 'template' && <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#2c73eb]" />}
                  巡检模板配置
                </div>
                <div onClick={() => setActiveMenu('plan')} className={getMenuClass('plan')}>
                  {activeMenu === 'plan' && <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#2c73eb]" />}
                  巡检计划配置
                </div>
              </div>
            )}
          </div>
          
          <div className="flex flex-col">
            <div 
              className="flex items-center px-5 py-3 cursor-pointer hover:bg-[#f8f9fa] text-gray-700"
              onClick={() => toggleMenu('maintenance')}
            >
              <Wrench size={18} className="mr-3 opacity-80" />
              <span className="text-[14px]">维修管理</span>
              {expandedMenus['maintenance'] ? <ChevronDown size={16} className="ml-auto opacity-50" /> : <ChevronRight size={16} className="ml-auto opacity-50" />}
            </div>

            {expandedMenus['maintenance'] && (
              <div className="flex flex-col flex-1 pb-1">
                <div onClick={() => setActiveMenu('work_order')} className={getMenuClass('work_order')}>
                  {activeMenu === 'work_order' && <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#2c73eb]" />}
                  维修工单管理
                </div>
              </div>
            )}
          </div>

          <div className="flex flex-col">
            <div 
              className="flex items-center px-5 py-3 cursor-pointer hover:bg-[#f8f9fa] text-gray-700"
              onClick={() => toggleMenu('alarm')}
            >
              <AlertCircle size={18} className="mr-3 opacity-80" />
              <span className="text-[14px]">告警管理</span>
              {expandedMenus['alarm'] ? <ChevronDown size={16} className="ml-auto opacity-50" /> : <ChevronRight size={16} className="ml-auto opacity-50" />}
            </div>

            {expandedMenus['alarm'] && (
              <div className="flex flex-col flex-1 pb-1">
                <div onClick={() => setActiveMenu('device_alarm')} className={getMenuClass('device_alarm')}>
                  {activeMenu === 'device_alarm' && <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#2c73eb]" />}
                  设备告警
                </div>
                <div className="pl-[44px] py-[10px] text-[13px] text-gray-600 hover:text-blue-600 cursor-pointer transition-colors">
                  越限告警设置
                </div>
                <div className="pl-[44px] py-[10px] text-[13px] text-gray-600 hover:text-blue-600 cursor-pointer transition-colors">
                  能耗告警设置
                </div>
                <div className="pl-[44px] py-[10px] text-[13px] text-gray-600 hover:text-blue-600 cursor-pointer transition-colors">
                  告警推送
                </div>
                <div className="pl-[44px] py-[10px] text-[13px] text-gray-600 hover:text-blue-600 cursor-pointer transition-colors">
                  告警推送记录
                </div>
              </div>
            )}
          </div>

          <div className="flex flex-col">
            <div 
              className="flex items-center px-5 py-3 cursor-pointer hover:bg-[#f8f9fa] text-gray-700"
              onClick={() => toggleMenu('meter')}
            >
              <FileText size={18} className="mr-3 opacity-80" />
              <span className="text-[14px]">电表集抄</span>
              {expandedMenus['meter'] ? <ChevronDown size={16} className="ml-auto opacity-50" /> : <ChevronRight size={16} className="ml-auto opacity-50" />}
            </div>
            {expandedMenus['meter'] && (
              <div className="flex flex-col flex-1 pb-1">
                <div className="pl-[44px] py-[10px] text-[13px] text-gray-600 hover:text-blue-600 cursor-pointer transition-colors">
                  用电参数监控
                </div>
              </div>
            )}
          </div>

          <div className="flex flex-col">
            <div 
              className="flex items-center px-5 py-3 cursor-pointer hover:bg-[#f8f9fa] text-gray-700"
              onClick={() => toggleMenu('water')}
            >
              <Droplets size={18} className="mr-3 opacity-80" />
              <span className="text-[14px]">水表集抄</span>
              {expandedMenus['water'] ? <ChevronDown size={16} className="ml-auto opacity-50" /> : <ChevronRight size={16} className="ml-auto opacity-50" />}
            </div>
            {expandedMenus['water'] && (
              <div className="flex flex-col flex-1 pb-1">
                <div className="pl-[44px] py-[10px] text-[13px] text-gray-600 hover:text-blue-600 cursor-pointer transition-colors">
                  用水量统计
                </div>
              </div>
            )}
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 bg-[#f3f4f9] overflow-auto p-4 flex flex-col min-w-0">
          {activeMenu === 'object' && !isModalOpen && (
            <div className="flex mb-4 ml-1 z-20 relative">
              <div className="bg-white rounded-[4px] p-0.5 flex border border-[#e2e5e9] shadow-sm">
                <button 
                  onClick={() => setObjectActiveTab('device')}
                  className={`px-6 py-1.5 text-[13px] rounded-[3px] transition-all cursor-pointer ${
                    objectActiveTab === 'device' 
                      ? 'bg-[#3b7fed] text-white font-medium' 
                      : 'text-[#666] hover:text-[#3b7fed]'
                  }`}
                >
                  设备类型
                </button>
                <button 
                  onClick={() => setObjectActiveTab('environment')}
                  className={`px-6 py-1.5 text-[13px] rounded-[3px] transition-all cursor-pointer ${
                    objectActiveTab === 'environment' 
                      ? 'bg-[#3b7fed] text-white font-medium' 
                      : 'text-[#666] hover:text-[#3b7fed]'
                  }`}
                >
                  环境类型
                </button>
              </div>
            </div>
          )}
          <div className="bg-white rounded-lg pt-5 pb-6 px-6 flex-1 shadow-sm flex flex-col flex-shrink-0 min-h-0 min-w-[800px] z-10 relative">
            {activeMenu === 'task' && <TaskView />}
            {activeMenu === 'object' && <ObjectConfigView activeTab={objectActiveTab} onModalToggle={setIsModalOpen} />}
            {activeMenu === 'template' && <TemplateConfigView />}
            {activeMenu === 'plan' && <PlanConfigView />}
            {activeMenu === 'work_order' && <WorkOrderView />}
            {activeMenu === 'device_alarm' && <DeviceAlarmView />}
          </div>
        </main>
      </div>
    </div>
  );
}
