import React, { useState } from 'react';
import { ChevronDown, Calendar } from 'lucide-react';
import Pagination from '../components/Pagination';
import CreateInspectionObjectModal from './CreateInspectionObjectModal';

const deviceData = [
  { id: 'dx-sb-01', name: '变压器', category: '配电系统', count: 3, updateTime: '2025-12-20 14:04:08' },
  { id: 'dx-sb-02', name: '开关', category: '照明系统', count: 6, updateTime: '2025-12-20 14:05:08' },
  { id: 'dx-sb-03', name: '智能水表', category: '用水系统', count: 5, updateTime: '2025-12-21 14:04:08' },
  { id: 'dx-sb-04', name: '空调', category: '空调系统', count: 6, updateTime: '2025-12-21 14:04:00' },
];

const envData = [
  { id: 'dx-hj-01', name: '配电房环境', category: '环境', count: 3, updateTime: '2025-12-20 14:04:08' },
  { id: 'dx-hj-02', name: '水泵房环境', category: '环境', count: 6, updateTime: '2025-12-20 14:05:08' },
  { id: 'dx-hj-03', name: '教学楼环境', category: '环境', count: 5, updateTime: '2025-12-21 14:04:08' },
];

interface ObjectConfigViewProps {
  activeTab: 'device' | 'environment';
  onModalToggle?: (isOpen: boolean) => void;
}

export default function ObjectConfigView({ activeTab, onModalToggle }: ObjectConfigViewProps) {
  const [showCreateModal, setShowCreateModal] = useState(false);

  const handleOpenModal = () => {
    setShowCreateModal(true);
    onModalToggle?.(true);
  };

  const handleCloseModal = () => {
    setShowCreateModal(false);
    onModalToggle?.(false);
  };

  const currentData = activeTab === 'device' ? deviceData : envData;

  return (
    <>
      {/* Filter Bar */}
      <div className="flex justify-between items-center mb-5">
        <div className="flex space-x-3 items-center">
          <input 
              type="text" 
              placeholder="请输入对象名称" 
              className="border border-[#e2e5e9] rounded-[4px] px-3 py-1.5 text-[13px] w-[180px] focus:outline-blue-500 placeholder-[#999] bg-white transition-shadow" 
          />
          
          {activeTab === 'device' && (
            <div className="relative">
              <select className="appearance-none border border-[#e2e5e9] rounded-[4px] pl-3 pr-8 py-1.5 text-[13px] w-[180px] focus:outline-blue-500 bg-white text-[#555] cursor-pointer">
                <option>请选择巡检类别</option>
              </select>
              <ChevronDown size={14} className="absolute right-2.5 top-2 text-[#999] pointer-events-none" />
            </div>
          )}

          <div className="relative">
            <input 
                type="text" 
                placeholder="请选择最后更新时间/天" 
                className="border border-[#e2e5e9] rounded-[4px] pl-3 pr-8 py-1.5 text-[13px] w-[200px] focus:outline-blue-500 placeholder-[#555] bg-white cursor-pointer" 
            />
            <Calendar size={14} className="absolute right-2.5 top-2 text-[#999] pointer-events-none" />
          </div>

          <button className="border border-[#e2e5e9] bg-white text-[#555] px-4 py-1.5 rounded-[4px] text-[13px] hover:bg-[#f9fafb] active:scale-95 transition-all h-[32px] w-[64px] flex items-center justify-center ml-1 cursor-pointer">
              重置
          </button>
          <button className="bg-[#3b7fed] text-white px-4 py-1.5 rounded-[4px] text-[13px] hover:bg-blue-600 active:scale-95 transition-all h-[32px] w-[64px] flex items-center justify-center cursor-pointer">
              查询
          </button>
        </div>
        
        <div className="flex items-center">
          <button className="border border-[#e2e5e9] bg-white text-[#555] px-4 py-1.5 rounded-[4px] text-[13px] hover:bg-[#f9fafb] active:scale-95 transition-all h-[32px] flex items-center justify-center shadow-sm font-medium mr-3 cursor-pointer">
            批量删除
          </button>
          <button 
            onClick={handleOpenModal}
            className="bg-[#3b7fed] text-white px-5 py-1.5 rounded-[4px] text-[13px] hover:bg-blue-600 active:scale-95 transition-all h-[32px] flex items-center justify-center shadow-sm font-medium mr-12 cursor-pointer"
          >
            新增
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="flex-1 w-full border border-[#f0f0f0] rounded-sm overflow-hidden mb-5">
        <table className="w-full text-left border-collapse min-w-[750px]">
          <thead>
            <tr className="bg-[#FAFCFF] text-[#333] text-[13px] font-semibold border-b border-[#f0f0f0]">
              <th className="py-3 px-4 w-[50px]"><input type="checkbox" className="w-[14px] h-[14px] border-gray-300 rounded text-blue-600 focus:ring-blue-500 cursor-pointer" /></th>
              <th className="py-3 px-4 font-semibold w-[15%]">对象编码</th>
              <th className="py-3 px-4 font-semibold w-[20%]">对象名称</th>
              <th className="py-3 px-4 font-semibold w-[15%]">巡检类别</th>
              <th className="py-3 px-4 font-semibold w-[15%]">巡检项数量</th>
              <th className="py-3 px-4 font-semibold w-[20%]">最后更新时间</th>
              <th className="py-3 px-4 font-semibold w-[15%]">操作</th>
            </tr>
          </thead>
          <tbody className="text-[13px] text-[#444]">
            {currentData.map((row, i) => (
              <tr key={i} className="border-b border-[#f5f5f5] hover:bg-[#fafafc] transition-colors">
                <td className="py-3.5 px-4"><input type="checkbox" className="w-[14px] h-[14px] border-gray-300 rounded text-blue-600 focus:ring-blue-500 cursor-pointer" /></td>
                <td className="py-3.5 px-4">{row.id}</td>
                <td className="py-3.5 px-4">{row.name}</td>
                <td className="py-3.5 px-4">{row.category}</td>
                <td className="py-3.5 px-4">{row.count}</td>
                <td className="py-3.5 px-4">{row.updateTime}</td>
                <td className="py-3.5 px-4 flex items-center space-x-2 select-none h-full mt-0.5">
                  <button className="border border-[#e5e7eb] text-gray-600 px-[14px] py-1 rounded shadow-sm hover:bg-gray-50 focus:outline-none active:scale-95 transition-all bg-white cursor-pointer">
                    编辑
                  </button>
                  <button className="border border-[#e5e7eb] text-gray-600 px-[14px] py-1 rounded shadow-sm hover:bg-gray-50 focus:outline-none active:scale-95 transition-all bg-white cursor-pointer">
                    删除
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Pagination />

      {showCreateModal && (
        <CreateInspectionObjectModal 
          onClose={handleCloseModal} 
          mode={activeTab === 'device' ? 'device' : 'environment'}
        />
      )}
    </>
  );
}
