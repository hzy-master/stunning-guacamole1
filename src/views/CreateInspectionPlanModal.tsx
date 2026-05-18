import React, { useState } from 'react';
import { X, Calendar, Plus, Minus, Search, Check, ChevronDown, ChevronRight } from 'lucide-react';

interface CreateInspectionPlanModalProps {
  onClose: () => void;
}

const templates = [
  { id: 1, name: '配电房每日巡检模板', icon: '⚡️', objectsCount: 6, itemsCount: 20 },
  { id: 2, name: '水泵房巡检模板', icon: '🚀', objectsCount: 7, itemsCount: 14 },
  { id: 3, name: '室内照明灯具巡检模板', icon: '💡', objectsCount: 6, itemsCount: 34 },
  { id: 4, name: '室外路灯巡检模板', icon: '💡', objectsCount: 3, itemsCount: 10 },
  { id: 5, name: '中央空调巡检模板', icon: '❄️', objectsCount: 4, itemsCount: 18 },
];

export default function CreateInspectionPlanModal({ onClose }: CreateInspectionPlanModalProps) {
  const [step, setStep] = useState(1);
  const [period, setPeriod] = useState('');
  const [timeRules, setTimeRules] = useState([{ id: 1 }]);
  const [showTemplateDropdown, setShowTemplateDropdown] = useState(false);
  const [selectedTemplates, setSelectedTemplates] = useState<number[]>([]);
  const [isTemplateApplied, setIsTemplateApplied] = useState(false);
  const [checkedItems, setCheckedItems] = useState<number[]>([1, 2, 3, 4]);
  const [selectedDevices, setSelectedDevices] = useState<string[]>(['图书馆变压器1', '配电系统', '变压器']);
  const [expandedNodes, setExpandedNodes] = useState<string[]>(['图书馆 / 一层', '配电系统', '变压器']);
  const [isRightPowerSystemExpanded, setIsRightPowerSystemExpanded] = useState(true);

  const deviceHierarchy: Record<string, string[]> = {
    '图书馆 / 一层': ['配电系统', '变压器', '图书馆变压器1', '图书馆变压器2', '电容柜', '直流屏', '空调系统'],
    '配电系统': ['变压器', '图书馆变压器1', '图书馆变压器2', '电容柜', '直流屏'],
    '变压器': ['图书馆变压器1', '图书馆变压器2'],
    '博学楼 / 一层': [],
  };

  const toggleDeviceSelection = (name: string) => {
    setSelectedDevices(prev => {
      const isSelecting = !prev.includes(name);
      const descendants = deviceHierarchy[name] || [];
      const affected = [name, ...descendants];

      if (isSelecting) {
        return [...new Set([...prev, ...affected])];
      } else {
        // Also uncheck parents if we uncheck a child
        let newSelection = prev.filter(n => !affected.includes(n));
        
        // Find parents and uncheck them
        Object.entries(deviceHierarchy).forEach(([parent, children]) => {
          if (children.includes(name)) {
            newSelection = newSelection.filter(n => n !== parent);
            // Recursively uncheck grandparents
            Object.entries(deviceHierarchy).forEach(([grandParent, gChildren]) => {
              if (gChildren.includes(parent)) {
                newSelection = newSelection.filter(n => n !== grandParent);
              }
            });
          }
        });
        
        return newSelection;
      }
    });
  };

  const toggleNodeExpand = (name: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setExpandedNodes(prev => 
      prev.includes(name) ? prev.filter(n => n !== name) : [...prev, name]
    );
  };

  const selectAllDevices = () => {
    const allDevices = Object.keys(deviceHierarchy).reduce((acc, parent) => {
      return [...acc, parent, ...deviceHierarchy[parent]];
    }, [] as string[]);
    setSelectedDevices([...new Set(allDevices)]);
  };

  const expandAllRightPanel = (expand: boolean) => {
    setIsRightPowerSystemExpanded(expand);
  };

  const selectAllInspectionItems = () => {
    setCheckedItems([1, 2, 3, 4]);
  };

  const toggleGroupCheck = (ids: number[]) => {
    const allChecked = ids.every(id => checkedItems.includes(id));
    if (allChecked) {
      setCheckedItems(prev => prev.filter(id => !ids.includes(id)));
    } else {
      setCheckedItems(prev => [...new Set([...prev, ...ids])]);
    }
  };

  const toggleItemCheck = (id: number) => {
    setCheckedItems(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const addTimeRule = () => {
    setTimeRules([...timeRules, { id: Date.now() }]);
  };

  const removeTimeRule = (idToRemove: number) => {
    if (timeRules.length > 1) {
      setTimeRules(timeRules.filter(rule => rule.id !== idToRemove));
    }
  };

  const toggleTemplateSelection = (id: number) => {
    setSelectedTemplates(prev => 
      prev.includes(id) ? prev.filter(tId => tId !== id) : [...prev, id]
    );
  };

  const handleApplyTemplates = () => {
    setIsTemplateApplied(true);
    setShowTemplateDropdown(false);
  };
  
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-in fade-in duration-200">
      <div className="bg-white rounded-[8px] w-[1200px] h-[750px] flex flex-col overflow-hidden shadow-2xl relative">
        {/* Header */}
        <div className="flex justify-between items-center px-6 h-[56px] border-b border-[#f0f0f0]">
          <h2 className="text-[16px] font-bold text-[#333]">新增巡检计划</h2>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-full transition-colors text-gray-500 hover:text-gray-700 cursor-pointer">
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Progress Steps Header */}
          <div className="flex items-center justify-center py-8 shrink-0 bg-white">
            <div className="flex items-center relative">
              <div className="flex flex-col items-center z-10">
                <div className={`w-[52px] h-[52px] rounded-full flex items-center justify-center mb-2 border ${step === 1 ? 'bg-white border-[#3b7fed] shadow-[0_6px_16px_rgba(59,127,237,0.2)]' : 'bg-white border-[#d9d9d9]'}`}>
                   <div className={`w-[40px] h-[40px] rounded-full flex items-center justify-center text-[18px] ${step === 1 ? 'bg-[#3b7fed] text-white' : 'text-gray-400 bg-gray-100'}`}>
                     <span>✏️</span>
                   </div>
                </div>
                <span className={`text-[14px] mt-1 ${step === 1 ? 'text-[#333] font-bold' : 'text-[#999]'}`}>计划信息</span>
              </div>

              <div className={`w-[240px] h-[2px] mx-[-10px] mt-[-28px] ${step >= 2 ? 'bg-[#3b7fed]' : 'bg-[#d9d9d9]'}`}></div>

              <div className="flex flex-col items-center z-10">
                <div className={`w-[52px] h-[52px] rounded-full flex items-center justify-center mb-2 border ${step === 2 ? 'bg-white border-[#3b7fed] shadow-[0_6px_16px_rgba(59,127,237,0.2)]' : 'bg-white border-[#d9d9d9]'}`}>
                   <div className={`w-[40px] h-[40px] rounded-full flex items-center justify-center text-[18px] ${step === 2 ? 'bg-[#3b7fed] text-white' : 'text-gray-400 bg-gray-100'}`}>
                     <span>📋</span>
                   </div>
                </div>
                <span className={`text-[14px] mt-1 ${step === 2 ? 'text-[#3b7fed] font-bold' : 'text-[#999]'}`}>巡检内容</span>
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-hidden flex flex-col">
          {step === 1 ? (
          <div className="px-10 pb-8 space-y-8 flex-1 overflow-y-auto">
            {/* Basic Info */}
            <section>
              <div className="flex items-center mb-6">
                <div className="w-[3px] h-[14px] bg-[#3b7fed] mr-2"></div>
                <h3 className="text-[#3b7fed] font-normal text-[14px]">基本信息</h3>
              </div>
              
              <div className="space-y-5 px-1">
                <div className="flex items-center space-x-12">
                  <div className="flex items-center flex-[3]">
                    <span className="w-[85px] text-[14px] text-[#333] shrink-0"><span className="text-[#ff4d4f] mr-1">*</span>计划名称</span>
                    <input 
                      type="text" 
                      placeholder="请输入计划名称（参考格式：中心配电房每日巡检）"
                      className="flex-1 w-full border border-[#e2e5e9] rounded-[4px] px-3 py-1.5 text-[14px] focus:outline-blue-500 placeholder-[#bfbfbf] h-[34px]"
                    />
                  </div>
                  <div className="flex items-center shrink-0">
                    <span className="w-[70px] text-[14px] text-[#333] shrink-0 text-right mr-3"><span className="text-[#ff4d4f] mr-1">*</span>执行人</span>
                    <select className="w-[215.875px] border border-[#e2e5e9] rounded-[4px] px-3 py-1.5 text-[14px] focus:outline-blue-500 text-[#bfbfbf] h-[34px] appearance-none bg-no-repeat bg-[right_10px_center] bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%23999%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')]">
                      <option value="">请选择</option>
                    </select>
                  </div>
                </div>

                <div className="flex items-center w-full">
                  <div className="flex items-center flex-[3]">
                    <span className="w-[85px] text-[14px] text-[#333] shrink-0"><span className="text-[#ff4d4f] mr-1">*</span>巡检地点</span>
                    <div className="flex-1 w-full flex items-center space-x-2">
                      <select className="flex-1 w-[calc(100%-60px)] border border-[#e2e5e9] rounded-[4px] px-3 py-1.5 text-[14px] focus:outline-blue-500 text-[#bfbfbf] h-[34px] appearance-none bg-no-repeat bg-[right_10px_center] bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%2212%22%20viewBox%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%23999%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')]">
                        <option value="">请选择</option>
                      </select>
                      <button className="flex-shrink-0 w-[24px] h-[24px] border border-[#333] rounded-full flex items-center justify-center text-[#333] hover:bg-gray-50 focus:outline-none cursor-pointer p-0">
                        <Plus size={16} />
                      </button>
                      <button className="flex-shrink-0 w-[24px] h-[24px] border border-[#333] rounded-full flex items-center justify-center text-[#333] hover:bg-gray-50 focus:outline-none cursor-pointer p-0">
                        <Minus size={16} />
                      </button>
                    </div>
                  </div>
                  <div className="flex-[0.59] shrink-0 text-white select-none">placeholder</div>
                </div>
              </div>
            </section>

            {/* Execution Method */}
            <section>
              <div className="flex items-center mb-6">
                <div className="w-[3px] h-[14px] bg-[#3b7fed] mr-2"></div>
                <h3 className="text-[#3b7fed] font-normal text-[14px]">执行方式</h3>
              </div>
              
              <div className="space-y-5 px-1">
                <div className="flex items-center space-x-8">
                  <div className="flex items-center flex-1">
                    <span className="w-[100px] text-[14px] text-[#333] shrink-0"><span className="text-[#ff4d4f] mr-1">*</span>计划开始日期</span>
                    <div className="relative flex-1">
                      <input 
                        type="text" 
                        placeholder="年 / 月 / 日"
                        className="w-full border border-[#e2e5e9] rounded-[4px] px-3 py-1.5 text-[14px] focus:outline-blue-500 placeholder-[#666] h-[34px]"
                      />
                      <Calendar size={16} className="absolute right-3 top-2.5 text-[#666]" />
                    </div>
                  </div>
                  <div className="flex items-center flex-1">
                    <span className="w-[100px] text-[14px] text-[#333] shrink-0"><span className="text-[#ff4d4f] mr-1">*</span>计划结束日期</span>
                    <div className="relative flex-1">
                      <input 
                        type="text" 
                        placeholder="年 / 月 / 日"
                        className="w-full border border-[#e2e5e9] rounded-[4px] px-3 py-1.5 text-[14px] focus:outline-blue-500 placeholder-[#666] h-[34px]"
                      />
                      <Calendar size={16} className="absolute right-3 top-2.5 text-[#666]" />
                    </div>
                  </div>
                </div>

                <div className="bg-[#f9f9f9] border border-[#f0f0f0] rounded-[4px] p-6 pb-8">
                  <div className={`flex items-center ${period ? 'mb-8' : ''}`}>
                    <div className="flex items-center">
                      <span className="w-[90px] text-[14px] text-[#333] shrink-0"><span className="text-[#ff4d4f] mr-1">*</span>执行周期</span>
                      <select 
                        className={`w-[200px] border border-[#e2e5e9] rounded-[4px] px-3 py-1.5 text-[14px] focus:outline-blue-500 h-[34px] appearance-none bg-no-repeat bg-[right_10px_center] bg-white bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%23999%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')] ${period ? 'text-[#333]' : 'text-[#bfbfbf]'}`}
                        value={period}
                        onChange={(e) => setPeriod(e.target.value)}
                      >
                        <option value="" disabled className="text-[#bfbfbf]">请选择</option>
                        <option value="每天" className="text-[#333]">每天</option>
                        <option value="每周" className="text-[#333]">每周</option>
                        <option value="每月" className="text-[#333]">每月</option>
                      </select>
                    </div>
                  </div>

                  {period && (
                    <div className="space-y-4">
                      {timeRules.map((rule, idx) => (
                        <div key={rule.id} className="flex items-center w-full whitespace-nowrap">
                          {/* 计划执行时间 */}
                          <div className="flex items-center mr-10 shrink-0">
                            <span className="text-[14px] text-[#333] shrink-0 mr-3"><span className="text-[#ff4d4f] mr-1">*</span>计划执行时间{idx + 1}</span>
                            <div className="flex items-center bg-white border border-[#e2e5e9] rounded-[4px] h-[34px] overflow-hidden">
                              {period === '每周' && (
                                <select className="w-[90px] h-full outline-none px-2 text-[14px] text-[#333] border-r border-[#e2e5e9] appearance-none bg-transparent bg-no-repeat bg-[right_4px_center] bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%23999%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')] pr-[20px]">
                                  <option value="">请选择</option>
                                  <option value="星期一">星期一</option>
                                  <option value="星期二">星期二</option>
                                  <option value="星期三">星期三</option>
                                  <option value="星期四">星期四</option>
                                  <option value="星期五">星期五</option>
                                  <option value="星期六">星期六</option>
                                  <option value="星期日">星期日</option>
                                </select>
                              )}
                              {period === '每月' && (
                                <select className="w-[90px] h-full outline-none px-2 text-[14px] text-[#333] border-r border-[#e2e5e9] appearance-none bg-transparent bg-no-repeat bg-[right_4px_center] bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%23999%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')] pr-[20px]">
                                  <option value="">请选择</option>
                                  {Array.from({length: 31}, (_, i) => i + 1).map(day => (
                                    <option key={day} value={`${day}日`}>{day}日</option>
                                  ))}
                                </select>
                              )}
                              <div className="flex items-center px-1">
                                <input type="text" className={`w-[42px] text-center outline-none text-[14px] text-[#333] ${period === '每天' ? 'ml-1' : ''}`} defaultValue="09:" />
                                <input type="text" className="w-[28px] text-center outline-none text-[14px] text-[#333]" defaultValue="00" />
                              </div>
                              <div className="px-2 border-l border-[#e2e5e9] h-full flex items-center justify-center">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                              </div>
                            </div>
                            <span className="mx-2 text-[#333] text-[14px] shrink-0">--</span>
                            <div className="flex items-center bg-white border border-[#e2e5e9] rounded-[4px] h-[34px] overflow-hidden">
                              {period === '每周' && (
                                <select className="w-[90px] h-full outline-none px-2 text-[14px] text-[#333] border-r border-[#e2e5e9] appearance-none bg-transparent bg-no-repeat bg-[right_4px_center] bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%23999%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')] pr-[20px]">
                                  <option value="">请选择</option>
                                  <option value="星期一">星期一</option>
                                  <option value="星期二">星期二</option>
                                  <option value="星期三">星期三</option>
                                  <option value="星期四">星期四</option>
                                  <option value="星期五">星期五</option>
                                  <option value="星期六">星期六</option>
                                  <option value="星期日">星期日</option>
                                </select>
                              )}
                              {period === '每月' && (
                                <select className="w-[90px] h-full outline-none px-2 text-[14px] text-[#333] border-r border-[#e2e5e9] appearance-none bg-transparent bg-no-repeat bg-[right_4px_center] bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%23999%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')] pr-[20px]">
                                  <option value="">请选择</option>
                                  {Array.from({length: 31}, (_, i) => i + 1).map(day => (
                                    <option key={day} value={`${day}日`}>{day}日</option>
                                  ))}
                                </select>
                              )}
                              <div className="flex items-center px-1">
                                <input type="text" className={`w-[42px] text-center outline-none text-[14px] text-[#333] ${period === '每天' ? 'ml-1' : ''}`} defaultValue="12:" />
                                <input type="text" className="w-[28px] text-center outline-none text-[14px] text-[#333]" defaultValue="00" />
                              </div>
                              <div className="px-2 border-l border-[#e2e5e9] h-full flex items-center justify-center">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                              </div>
                            </div>
                          </div>

                          {/* 任务生成时间 */}
                          <div className="flex items-center mr-10 shrink-0">
                            <span className="text-[14px] text-[#333] shrink-0 mr-3 whitespace-nowrap"><span className="text-[#ff4d4f] mr-1">*</span>任务生成时间{idx + 1}</span>
                            <div className="flex items-center bg-white border border-[#e2e5e9] rounded-[4px] h-[34px] overflow-hidden">
                              <select className="w-[100px] h-full outline-none px-2 text-[14px] text-[#333] border-r border-[#e2e5e9] appearance-none bg-transparent bg-no-repeat bg-[right_4px_center] bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%2212%22%20viewBox%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%23999%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')] pr-[20px]">
                                <option value="">请选择</option>
                                {period === '每天' && (
                                  <>
                                    <option value="执行当天">执行当天</option>
                                    <option value="执行前一天">执行前一天</option>
                                  </>
                                )}
                                {period === '每周' && (
                                  <>
                                    <option value="执行前一天">执行前一天</option>
                                    <option value="执行前两天">执行前两天</option>
                                  </>
                                )}
                                {period === '每月' && (
                                  <>
                                    <option value="执行前一天">执行前一天</option>
                                    <option value="执行前两天">执行前两天</option>
                                    <option value="执行前三天">执行前三天</option>
                                    <option value="执行前七天">执行前七天</option>
                                  </>
                                )}
                              </select>
                              <div className="flex items-center px-1">
                                <input type="text" className="w-[42px] text-center outline-none text-[14px] text-[#333] ml-1" defaultValue="09:" />
                                <input type="text" className="w-[28px] text-center outline-none text-[14px] text-[#333]" defaultValue="00" />
                              </div>
                              <div className="px-2 border-l border-[#e2e5e9] h-full flex items-center justify-center">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                              </div>
                            </div>
                          </div>

                          {/* 操作按钮 */}
                          <div className="flex items-center space-x-2 shrink-0">
                            <button 
                               onClick={addTimeRule}
                               className="w-[24px] h-[24px] border border-[#333] rounded-full flex items-center justify-center text-[#333] hover:bg-gray-50 focus:outline-none cursor-pointer p-0 shadow-sm"
                            >
                              <Plus size={16} />
                            </button>
                            <button 
                               onClick={() => removeTimeRule(rule.id)}
                               className={`w-[24px] h-[24px] border border-[#333] rounded-full flex items-center justify-center text-[#333] hover:bg-gray-50 focus:outline-none cursor-pointer p-0 shadow-sm ${timeRules.length <= 1 ? 'opacity-30 cursor-not-allowed' : ''}`}
                               disabled={timeRules.length <= 1}
                            >
                              <Minus size={16} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>


                <div className="flex items-center pt-2">
                  <span className="w-[85px] text-[14px] text-[#333]"><span className="text-[#ff4d4f] mr-1">*</span>提前提醒</span>
                  <span className="text-[#333] text-[14px] mr-3">任务计划执行前</span>
                  <select className="w-[300px] border border-[#e2e5e9] bg-white rounded-[4px] px-3 py-1.5 text-[14px] focus:outline-blue-500 text-[#bfbfbf] h-[34px] appearance-none bg-no-repeat bg-[right_10px_center] bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%2212%22%20viewBox%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%23999%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')]">
                    <option value="">不提醒</option>
                  </select>
                  <span className="text-[#333] text-[14px] ml-3">发送提醒通知</span>
                </div>
              </div>
            </section>
          </div>
          ) : (
            <div className="flex-1 flex flex-col bg-white overflow-hidden">
              {/* Step 2 Toolbar */}
              <div className="h-[52px] bg-white border-y border-[#f0f0f0] flex items-center px-6 shrink-0 relative z-20">
                <div className="flex items-center h-full">
                  <div className="flex items-center pl-3 border-l-[3px] border-[#3b7fed] h-[20px] mr-6">
                    <span className="text-[14px] text-[#333] font-medium">配置巡检内容</span>
                  </div>
                  
                  <div className="relative h-full flex items-center ml-4">
                    <button 
                      className="bg-[#3b7fed] text-white px-4 py-1.5 rounded-[4px] text-[13px] hover:bg-blue-600 transition-colors flex items-center h-[30px] cursor-pointer"
                      onClick={() => setShowTemplateDropdown(!showTemplateDropdown)}
                    >
                      <Plus size={14} className="mr-1" />
                      添加模板
                    </button>

                    {/* Template Dropdown Popover */}
                    {showTemplateDropdown && (
                      <div className="absolute top-full left-0 mt-2 w-[320px] bg-white rounded-[4px] shadow-[0_4px_12px_rgba(0,0,0,0.15)] border border-[#e8e8e8] z-[100] flex flex-col">
                        <div className="p-3 border-b border-[#f0f0f0]">
                          <div className="relative">
                            <Search size={14} className="absolute left-3 top-2.5 text-[#bfbfbf]" />
                            <input 
                              type="text" 
                              placeholder="搜索模板名称"
                              className="w-full border border-[#e2e5e9] rounded-[4px] pl-8 pr-3 py-1.5 text-[13px] h-[32px] focus:outline-blue-500"
                            />
                          </div>
                        </div>
                        <div className="max-h-[300px] overflow-y-auto custom-scrollbar">
                          {templates.map(template => (
                            <div 
                              key={template.id} 
                              className="flex justify-between items-center px-4 py-3 hover:bg-[#f5f7fa] cursor-pointer group"
                              onClick={() => toggleTemplateSelection(template.id)}
                            >
                              <div className="flex items-center">
                                <div className={`w-[14px] h-[14px] border rounded-[2px] flex items-center justify-center mr-3 transition-colors ${selectedTemplates.includes(template.id) ? 'bg-[#3b7fed] border-[#3b7fed]' : 'border-[#d9d9d9] bg-white'}`}>
                                  {selectedTemplates.includes(template.id) && <Check size={10} className="text-white" />}
                                </div>
                                <div className="flex flex-col">
                                  <span className="text-[13px] text-[#333] flex items-center font-medium group-hover:text-[#3b7fed]">
                                    <span className="mr-1">{template.icon}</span> {template.name}
                                  </span>
                                  <span className="text-[11px] text-[#999] mt-0.5">
                                    {template.objectsCount}个巡检对象，{template.itemsCount}个巡检项
                                  </span>
                                </div>
                              </div>
                              <div className="bg-[#f0f5ff] text-[#3b7fed] text-[11px] px-2 py-0.5 rounded-[10px] border border-[#d6e4ff]">
                                {template.itemsCount}项
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className="p-3 border-t border-[#f0f0f0] flex justify-between items-center bg-[#fafafa]">
                          <span className="text-[12px] text-[#666]">共 <span className="text-[#3b7fed] font-bold">{templates.length}</span> 个模板</span>
                          <button 
                            className="bg-[#3b7fed] text-white px-4 py-1 rounded-[4px] text-[12px] hover:bg-blue-600 shadow-sm"
                            onClick={handleApplyTemplates}
                          >
                            确定
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Template Applied Banner */}
              {isTemplateApplied && (
                <div className="px-6 py-2 bg-[#f0f5ff] border-b border-[#f0f0f0] shrink-0">
                  <div className="bg-[#ebf3ff] rounded-[4px] px-4 flex items-center text-[#3b7fed] border border-[#d9e8ff] cursor-pointer shadow-sm hover:bg-[#e1eeff] transition-colors w-max h-[32px]">
                    <span className="mr-2 text-[16px]">📋</span>
                    <span className="text-[13px] font-medium">配电房每日例行巡检模板</span>
                  </div>
                </div>
              )}

              {/* Step 2 Content Area */}
              <div className="flex-1 flex overflow-hidden">
                {/* Left Sidebar */}
                <div className="w-[260px] bg-[#f9fafb] border-r border-[#f0f0f0] flex flex-col h-full shrink-0 overflow-hidden pt-4">
                  <div className="px-4 pb-3 shrink-0 flex justify-between items-center">
                    <h3 className="text-[14px] font-bold text-[#333]">选择设备</h3>
                    {isTemplateApplied && (
                      <button 
                        onClick={selectAllDevices}
                        className="text-[12px] text-[#333] border border-[#d9d9d9] rounded-[4px] px-2 py-0.5 bg-white hover:border-[#3b7fed] hover:text-[#3b7fed] cursor-pointer transition-colors shadow-sm"
                      >
                        一键全选
                      </button>
                    )}
                  </div>
                  
                  <div className="flex-1 overflow-y-auto px-2 pb-10 custom-scrollbar bg-[#f9f9fa]">
                    {!isTemplateApplied ? (
                      <div className="pt-20 flex flex-col items-center justify-center text-[#bfbfbf] text-[13px] px-4 text-center">
                        <Search size={32} className="mb-2 opacity-20" />
                        <p>请先点击“添加模板”按钮</p>
                      </div>
                    ) : (
                      <div className="text-[14px] text-[#333] py-2">
                        {/* Tree Structure */}
                        <div className={`flex items-center h-[32px] px-2 hover:bg-[#f0f0f0] rounded cursor-pointer transition-colors ${selectedDevices.includes('图书馆 / 一层') ? 'bg-[#ebf3ff]' : ''}`} onClick={() => toggleDeviceSelection('图书馆 / 一层')}>
                          <div onClick={(e) => toggleNodeExpand('图书馆 / 一层', e)} className="w-6 h-6 flex items-center justify-center shrink-0 hover:bg-gray-200/50 rounded transition-colors mr-1">
                            {expandedNodes.includes('图书馆 / 一层') ? <ChevronDown size={14} className="text-[#999]" /> : <ChevronRight size={14} className="text-[#999]" />}
                          </div>
                          <div className={`w-[14px] h-[14px] border rounded-[2px] flex items-center justify-center mr-2 shrink-0 ${selectedDevices.includes('图书馆 / 一层') ? 'bg-[#3b7fed] border-[#3b7fed]' : 'border-[#d9d9d9] bg-white'}`}>
                            {selectedDevices.includes('图书馆 / 一层') && <Check size={10} className="text-white" strokeWidth={3} />}
                          </div>
                          <span className={`text-[13px] truncate transition-colors ${selectedDevices.includes('图书馆 / 一层') ? 'font-bold text-[#3b7fed]' : ''}`}>图书馆 / 一层</span>
                        </div>
                        
                        {expandedNodes.includes('图书馆 / 一层') && (
                          <div className="ml-4">
                            <div className={`flex items-center h-[32px] px-2 hover:bg-[#f0f0f0] rounded cursor-pointer transition-colors ${selectedDevices.includes('配电系统') ? 'bg-[#ebf3ff]' : ''}`} onClick={() => toggleDeviceSelection('配电系统')}>
                              <div onClick={(e) => toggleNodeExpand('配电系统', e)} className="w-6 h-6 flex items-center justify-center shrink-0 hover:bg-gray-200/50 rounded transition-colors mr-1">
                                {expandedNodes.includes('配电系统') ? <ChevronDown size={14} className="text-[#999]" /> : <ChevronRight size={14} className="text-[#999]" />}
                              </div>
                              <div className={`w-[14px] h-[14px] border rounded-[2px] flex items-center justify-center mr-2 shrink-0 ${selectedDevices.includes('配电系统') ? 'bg-[#3b7fed] border-[#3b7fed]' : 'border-[#d9d9d9] bg-white'}`}>
                                {selectedDevices.includes('配电系统') && <Check size={10} className="text-white" strokeWidth={3} />}
                              </div>
                              <span className={`text-[13px] truncate transition-colors ${selectedDevices.includes('配电系统') ? 'font-medium text-[#3b7fed]' : ''}`}>配电系统</span>
                            </div>
                            
                            {expandedNodes.includes('配电系统') && (
                              <div className="ml-4">
                                <div className={`flex items-center h-[32px] px-2 hover:bg-[#f0f0f0] rounded cursor-pointer transition-colors group ${selectedDevices.includes('变压器') ? 'bg-[#ebf3ff]' : ''}`} onClick={() => toggleDeviceSelection('变压器')}>
                                  <div onClick={(e) => toggleNodeExpand('变压器', e)} className="w-6 h-6 flex items-center justify-center shrink-0 hover:bg-gray-200/50 rounded transition-colors mr-1">
                                    {expandedNodes.includes('变压器') ? <ChevronDown size={14} className={selectedDevices.includes('变压器') ? 'text-[#3b7fed]' : 'text-[#999]'} /> : <ChevronRight size={14} className={selectedDevices.includes('变压器') ? 'text-[#3b7fed]' : 'text-[#999]'} />}
                                  </div>
                                  <div className={`w-[14px] h-[14px] border rounded-[2px] flex items-center justify-center mr-2 shrink-0 ${selectedDevices.includes('变压器') ? 'bg-[#3b7fed] border-[#3b7fed]' : 'border-[#d9d9d9] bg-white'}`}>
                                    {selectedDevices.includes('变压器') && <Check size={10} className="text-white" strokeWidth={3} />}
                                  </div>
                                  <span className={`text-[13px] truncate transition-colors ${selectedDevices.includes('变压器') ? 'font-medium text-[#3b7fed]' : ''}`}>变压器</span>
                                </div>
                                
                                {expandedNodes.includes('变压器') && (
                                  <div className="ml-4">
                                    <div className={`flex items-center h-[32px] px-2 rounded-[4px] cursor-pointer transition-colors ${selectedDevices.includes('图书馆变压器1') ? 'bg-[#ebf3ff] text-[#3b7fed]' : 'hover:bg-[#f0f0f0] text-[#666]'}`} onClick={() => toggleDeviceSelection('图书馆变压器1')}>
                                      <div className="w-6 h-6 shrink-0 mr-1" />
                                      <div className={`w-[14px] h-[14px] border rounded-[2px] flex items-center justify-center mr-2 shrink-0 ${selectedDevices.includes('图书馆变压器1') ? 'bg-[#3b7fed] border-[#3b7fed]' : 'border-[#d9d9d9] bg-white'}`}>
                                        {selectedDevices.includes('图书馆变压器1') && <Check size={10} className="text-white" strokeWidth={3} />}
                                      </div>
                                      <span className="text-[13px] truncate">图书馆变压器1</span>
                                    </div>
                                    <div className={`flex items-center h-[32px] px-2 rounded-[4px] cursor-pointer transition-colors ${selectedDevices.includes('图书馆变压器2') ? 'bg-[#ebf3ff] text-[#3b7fed]' : 'hover:bg-[#f0f0f0] text-[#666]'}`} onClick={() => toggleDeviceSelection('图书馆变压器2')}>
                                      <div className="w-6 h-6 shrink-0 mr-1" />
                                      <div className={`w-[14px] h-[14px] border rounded-[2px] flex items-center justify-center mr-2 shrink-0 ${selectedDevices.includes('图书馆变压器2') ? 'bg-[#3b7fed] border-[#3b7fed]' : 'border-[#d9d9d9] bg-white'}`}>
                                        {selectedDevices.includes('图书馆变压器2') && <Check size={10} className="text-white" strokeWidth={3} />}
                                      </div>
                                      <span className="text-[13px] truncate">图书馆变压器2</span>
                                    </div>
                                  </div>
                                )}
                                
                                <div className={`flex items-center h-[32px] px-2 rounded-[4px] cursor-pointer transition-colors ${selectedDevices.includes('电容柜') ? 'bg-[#ebf3ff] text-[#3b7fed]' : 'hover:bg-[#f0f0f0] text-[#666]'}`} onClick={() => toggleDeviceSelection('电容柜')}>
                                  <div className="w-6 h-6 flex items-center justify-center shrink-0 mr-1">
                                    <ChevronRight size={14} className={selectedDevices.includes('电容柜') ? 'text-[#3b7fed]' : 'text-[#999]'} />
                                  </div>
                                  <div className={`w-[14px] h-[14px] border rounded-[2px] flex items-center justify-center mr-2 shrink-0 ${selectedDevices.includes('电容柜') ? 'bg-[#3b7fed] border-[#3b7fed]' : 'border-[#d9d9d9] bg-white'}`}>
                                    {selectedDevices.includes('电容柜') && <Check size={10} className="text-white" strokeWidth={3} />}
                                  </div>
                                  <span className="text-[13px] truncate">电容柜</span>
                                </div>
                                <div className={`flex items-center h-[32px] px-2 rounded-[4px] cursor-pointer transition-colors ${selectedDevices.includes('直流屏') ? 'bg-[#ebf3ff] text-[#3b7fed]' : 'hover:bg-[#f0f0f0] text-[#666]'}`} onClick={() => toggleDeviceSelection('直流屏')}>
                                  <div className="w-6 h-6 flex items-center justify-center shrink-0 mr-1">
                                    <ChevronRight size={14} className={selectedDevices.includes('直流屏') ? 'text-[#3b7fed]' : 'text-[#999]'} />
                                  </div>
                                  <div className={`w-[14px] h-[14px] border rounded-[2px] flex items-center justify-center mr-2 shrink-0 ${selectedDevices.includes('直流屏') ? 'bg-[#3b7fed] border-[#3b7fed]' : 'border-[#d9d9d9] bg-white'}`}>
                                    {selectedDevices.includes('直流屏') && <Check size={10} className="text-white" strokeWidth={3} />}
                                  </div>
                                  <span className="text-[13px] truncate">直流屏</span>
                                </div>
                              </div>
                            )}
                            
                            <div className={`flex items-center h-[32px] px-2 rounded-[4px] cursor-pointer transition-colors ${selectedDevices.includes('空调系统') ? 'bg-[#ebf3ff] text-[#3b7fed]' : 'hover:bg-[#f0f0f0] text-[#666]'}`} onClick={() => toggleDeviceSelection('空调系统')}>
                              <div className="w-6 h-6 flex items-center justify-center shrink-0 mr-1">
                                <ChevronRight size={14} className={selectedDevices.includes('空调系统') ? 'text-[#3b7fed]' : 'text-[#999]'} />
                              </div>
                              <div className={`w-[14px] h-[14px] border rounded-[2px] flex items-center justify-center mr-2 shrink-0 ${selectedDevices.includes('空调系统') ? 'bg-[#3b7fed] border-[#3b7fed]' : 'border-[#d9d9d9] bg-white'}`}>
                                {selectedDevices.includes('空调系统') && <Check size={10} className="text-white" strokeWidth={3} />}
                              </div>
                              <span className="text-[13px] truncate">空调系统</span>
                            </div>
                          </div>
                        )}
                        
                        <div className={`flex items-center h-[32px] px-2 hover:bg-[#f0f0f0] rounded cursor-pointer mt-1 transition-colors ${selectedDevices.includes('博学楼 / 一层') ? 'bg-[#ebf3ff]' : ''}`} onClick={() => toggleDeviceSelection('博学楼 / 一层')}>
                          <div className="w-6 h-6 flex items-center justify-center shrink-0 mr-1">
                            <ChevronRight size={14} className="text-[#999]" />
                          </div>
                          <div className={`w-[14px] h-[14px] border rounded-[2px] flex items-center justify-center mr-2 shrink-0 ${selectedDevices.includes('博学楼 / 一层') ? 'bg-[#3b7fed] border-[#3b7fed]' : 'border-[#d9d9d9] bg-white'}`}>
                            {selectedDevices.includes('博学楼 / 一层') && <Check size={10} className="text-white" strokeWidth={3} />}
                          </div>
                          <span className={`text-[13px] truncate transition-colors ${selectedDevices.includes('博学楼 / 一层') ? 'font-bold text-[#3b7fed]' : 'text-[#333]'}`}>博学楼 / 一层</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Right Content Area */}
                <div className="flex-1 flex flex-col bg-white overflow-hidden p-0">
                   {!isTemplateApplied ? (
                     <div className="flex-1 flex flex-col items-center justify-center pb-20 bg-gray-50/50">
                        <div className="w-[80px] h-[80px] bg-[#f5f5f5] rounded-full flex items-center justify-center mb-4 border border-[#f0f0f0] shadow-inner">
                          <span className="text-[32px] opacity-40">📋</span>
                        </div>
                        <p className="text-[#bfbfbf] text-[14px]">请先从上方添加巡检模板</p>
                     </div>
                   ) : (
                     <div className="flex-1 flex flex-col overflow-hidden">
                        {/* Status Bar */}
                        <div className="px-6 py-3 border-b border-[#f0f0f0] flex justify-between items-center shrink-0 bg-white">
                           <div className="text-[13px] text-[#666] flex items-center">
                             模板共包含12个巡检对象，36个巡检项 
                             <span className="text-[#3b7fed] ml-10 cursor-pointer hover:underline font-medium">已勾选 12 / 36 项</span>
                           </div>
                           <div className="flex space-x-2">
                              <button 
                                onClick={() => expandAllRightPanel(!isRightPowerSystemExpanded)}
                                className="border border-[#d9d9d9] text-[#333] text-[12px] px-3 py-1 rounded-[4px] bg-white hover:text-[#3b7fed] hover:border-[#3b7fed] cursor-pointer shadow-sm transition-all whitespace-nowrap"
                              >
                                {isRightPowerSystemExpanded ? '收起全部' : '展开全部'}
                              </button>
                              <button 
                                onClick={selectAllInspectionItems}
                                className="border border-[#d9d9d9] text-[#333] text-[12px] px-3 py-1 rounded-[4px] bg-white hover:text-[#3b7fed] hover:border-[#3b7fed] cursor-pointer shadow-sm transition-all whitespace-nowrap"
                              >
                                全选巡检项
                              </button>
                           </div>
                        </div>

                        {/* Inspection Items List */}
                        <div className="flex-1 overflow-y-auto p-6 custom-scrollbar bg-white">
                           <div 
                             className="font-bold text-[#333] text-[15px] flex items-center mb-4 group cursor-pointer w-max"
                             onClick={() => setIsRightPowerSystemExpanded(!isRightPowerSystemExpanded)}
                           >
                             <ChevronDown size={18} className={`mr-1.5 text-[#333] group-hover:text-[#3b7fed] transition-all ${isRightPowerSystemExpanded ? '' : '-rotate-90'}`} /> 
                             <span className="group-hover:text-[#3b7fed] transition-colors">配电系统</span>
                           </div>

                           {isRightPowerSystemExpanded && (
                             <>

                           {/* Object Group - Transformer */}
                           <div className="mb-6 rounded-[8px] border border-[#f0f0f0] overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                              <div className="bg-[#fafbfc] px-4 py-3.5 flex items-center justify-between border-b border-[#f0f0f0]">
                                 <div className="flex items-center text-[14px] font-bold text-[#333]">
                                   <div 
                                     className={`w-[15px] h-[15px] border rounded-[2px] flex items-center justify-center mr-3 shrink-0 cursor-pointer transition-colors ${[1, 2, 3, 4].every(id => checkedItems.includes(id)) ? 'bg-[#3b7fed] border-[#3b7fed]' : 'border-[#d9d9d9] bg-white'}`}
                                     onClick={(e) => { e.stopPropagation(); toggleGroupCheck([1, 2, 3, 4]); }}
                                   >
                                       {[1, 2, 3, 4].every(id => checkedItems.includes(id)) && <Check size={10} className="text-white" />}
                                   </div>
                                   <span className="text-[#faad14] mr-2 text-[16px]">⚡</span> 变压器
                                   <span className="text-[#8c8c8c] font-normal text-[12px] ml-3 bg-[#f5f5f5] px-2 py-0.5 rounded-full">已选 {[1, 2, 3, 4].filter(id => checkedItems.includes(id)).length}/4</span>
                                 </div>
                                 <div className="flex items-center space-x-4 pr-6">
                                    <span className="text-[15px] text-[#333] font-bold w-[90px] text-center">巡检标准</span>
                                    <span className="text-[15px] text-[#333] font-bold w-[60px] text-right pr-[19px] mr-[15px]">拍照</span>
                                    <div className="w-[20px] flex items-center justify-center">
                                      <ChevronDown size={16} className="text-[#bfbfbf]" />
                                    </div>
                                 </div>
                              </div>
                              
                              <div className="divide-y divide-[#f5f5f5] bg-white">
                                 {/* Item 1 */}
                                 <div 
                                   className="px-4 py-4 flex items-center justify-between hover:bg-[#fcfdfe] group cursor-pointer transition-colors"
                                   onClick={() => toggleItemCheck(1)}
                                 >
                                    <div className="flex items-center text-[13px] text-[#333] flex-1">
                                      <div className={`w-[15px] h-[15px] border rounded-[2px] flex items-center justify-center mr-3 shrink-0 ml-0.5 transition-colors ${checkedItems.includes(1) ? 'bg-[#3b7fed] border-[#3b7fed]' : 'border-[#d9d9d9] bg-white'}`}>
                                        {checkedItems.includes(1) && <Check size={10} className="text-white" />}
                                      </div>
                                      <span className={`transition-all ${checkedItems.includes(1) ? 'text-[#333] font-medium' : 'text-[#666]'}`}>变压器指示灯是否正常</span>
                                    </div>
                                    <div className="flex items-center space-x-4 pr-6 shrink-0">
                                       <div className="w-[160px] flex items-center space-x-6 pl-2">
                                         <span className="text-[#52c41a] border border-[#b7eb8f] rounded-full px-4 py-0.5 text-[13px] bg-[#f6ffed] leading-none font-medium shrink-0">单选</span>
                                         <span className="text-[14px] text-[#333] ml-[11px]">正常</span>
                                       </div>
                                       <div className="w-[60px] flex justify-center"></div>
                                       <div className="w-[20px] flex justify-center"></div>
                                    </div>
                                 </div>
                                 
                                 {/* Item 2 */}
                                 <div 
                                   className="px-4 py-4 flex items-center justify-between hover:bg-[#fcfdfe] group cursor-pointer transition-colors"
                                   onClick={() => toggleItemCheck(2)}
                                 >
                                    <div className="flex items-center text-[13px] text-[#333] flex-1">
                                      <div className={`w-[15px] h-[15px] border rounded-[2px] flex items-center justify-center mr-3 shrink-0 ml-0.5 transition-colors ${checkedItems.includes(2) ? 'bg-[#3b7fed] border-[#3b7fed]' : 'border-[#d9d9d9] bg-white'}`}>
                                        {checkedItems.includes(2) && <Check size={10} className="text-white" />}
                                      </div>
                                      <span className={`transition-all ${checkedItems.includes(2) ? 'text-[#333] font-medium' : 'text-[#666]'}`}>是否有异常电磁轰鸣声或放电声</span>
                                    </div>
                                    <div className="flex items-center space-x-4 pr-6 shrink-0">
                                       <div className="w-[160px] flex items-center space-x-6 pl-2">
                                         <span className="text-[#52c41a] border border-[#b7eb8f] rounded-full px-4 py-0.5 text-[13px] bg-[#f6ffed] leading-none font-medium shrink-0">单选</span>
                                         <span className="text-[14px] text-[#333] ml-[17px]">无</span>
                                       </div>
                                       <div className="w-[60px] flex justify-center">
                                          <span className="text-[#3b7fed] font-bold text-[18px] ml-[-10px]">√</span>
                                       </div>
                                       <div className="w-[20px] flex justify-center"></div>
                                    </div>
                                 </div>
                                 
                                 {/* Item 3 */}
                                 <div 
                                   className="px-4 py-4 flex items-center justify-between hover:bg-[#fcfdfe] group cursor-pointer transition-colors"
                                   onClick={() => toggleItemCheck(3)}
                                 >
                                    <div className="flex items-center text-[13px] text-[#333] flex-1">
                                      <div className={`w-[15px] h-[15px] border rounded-[2px] flex items-center justify-center mr-3 shrink-0 ml-0.5 transition-colors ${checkedItems.includes(3) ? 'bg-[#3b7fed] border-[#3b7fed]' : 'border-[#d9d9d9] bg-white'}`}>
                                        {checkedItems.includes(3) && <Check size={10} className="text-white" />}
                                      </div>
                                      <span className={`transition-all ${checkedItems.includes(3) ? 'text-[#333] font-medium' : 'text-[#666]'}`}>温控仪温度是否在正常范围内</span>
                                    </div>
                                    <div className="flex items-center space-x-4 pr-6 shrink-0">
                                       <div className="w-[160px] flex items-center space-x-6 pl-2">
                                         <span className="text-[#1890ff] border border-[#91d5ff] rounded-full px-4 py-0.5 text-[12px] bg-[#e6f7ff] leading-none font-medium shrink-0">数值</span>
                                         <span className="text-[14px] text-[#333] ml-[4px]">55-80℃</span>
                                       </div>
                                       <div className="w-[60px] flex justify-center"></div>
                                       <div className="w-[20px] flex justify-center"></div>
                                    </div>
                                 </div>

                                 {/* Item 4 */}
                                 <div 
                                   className="px-4 py-4 flex items-center justify-between hover:bg-[#fcfdfe] group cursor-pointer transition-colors"
                                   onClick={() => toggleItemCheck(4)}
                                 >
                                    <div className="flex items-center text-[13px] text-[#333] flex-1">
                                      <div className={`w-[15px] h-[15px] border rounded-[2px] flex items-center justify-center mr-3 shrink-0 ml-0.5 transition-colors ${checkedItems.includes(4) ? 'bg-[#3b7fed] border-[#3b7fed]' : 'border-[#d9d9d9] bg-white'}`}>
                                        {checkedItems.includes(4) && <Check size={10} className="text-white" />}
                                      </div>
                                      <span className={`transition-all ${checkedItems.includes(4) ? 'text-[#333] font-medium' : 'text-[#666]'}`}>变压器外观是否正常</span>
                                    </div>
                                    <div className="flex items-center space-x-4 pr-6 shrink-0">
                                       <div className="w-[160px] flex items-center space-x-6 pl-2">
                                         <span className="text-[#52c41a] border border-[#b7eb8f] rounded-full px-4 py-0.5 text-[13px] bg-[#f6ffed] font-medium leading-none shrink-0">单选</span>
                                         <span className="text-[14px] text-[#333] ml-[11px]">正常</span>
                                       </div>
                                       <div className="w-[60px] flex justify-center"></div>
                                       <div className="w-[20px] flex justify-center"></div>
                                    </div>
                                 </div>
                              </div>
                           </div>

                           {/* Object Group - Capacitor Cabinet (Collapsed) */}
                           <div className="mb-6 rounded-[8px] border border-[#f0f0f0] overflow-hidden shadow-sm group">
                              <div className="bg-[#fafbfc] px-4 py-3.5 flex items-center justify-between hover:bg-gray-50 transition-colors cursor-pointer">
                                 <div className="flex items-center text-[14px] font-bold text-[#333]">
                                   <div className="w-[15px] h-[15px] border border-[#d9d9d9] rounded-[2px] bg-white flex items-center justify-center mr-3 shrink-0">
                                   </div>
                                    <span className="text-[#faad14] mr-2 text-[16px]">⚡</span> 电容柜
                                    <span className="text-[#8c8c8c] font-normal text-[12px] ml-4 bg-[#f5f5f5] px-2 py-0.5 rounded-full">已选 3/3</span>
                                 </div>
                                 <div className="pr-6">
                                   <ChevronRight size={18} className="text-[#bfbfbf]" />
                                 </div>
                              </div>
                           </div>
                           
                           {/* Padding for bottom */}
                           <div className="h-10"></div>
                           </>
                           )}
                        </div>
                     </div>
                   )}
                </div>
              </div>
            </div>
          )}
        </div>
        </div>
        
        {/* Footer */}
        <div className="flex justify-end items-center px-10 h-[72px] border-t border-[#f0f0f0] shrink-0 bg-white z-10">
          {step === 1 ? (
            <button 
              className="bg-[#3b7fed] text-white px-8 py-2 rounded-[4px] text-[14px] hover:bg-blue-600 active:scale-95 transition-all h-[36px] flex items-center justify-center cursor-pointer shadow-sm"
              onClick={() => setStep(2)}
            >
              下一步
            </button>
          ) : (
            <div className="flex space-x-4">
              <button 
                className="border border-[#d9d9d9] text-[#333] px-8 py-2 rounded-[4px] text-[14px] hover:border-[#3b7fed] hover:text-[#3b7fed] transition-all h-[40px] flex items-center justify-center cursor-pointer bg-white shadow-sm"
                onClick={() => setStep(1)}
              >
                上一步
              </button>
              <button 
                className="bg-[#3b7fed] text-white px-8 py-2 rounded-[4px] text-[14px] hover:bg-blue-600 active:scale-95 transition-all h-[40px] flex items-center justify-center cursor-pointer shadow-sm"
                onClick={onClose}
              >
                保存
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
