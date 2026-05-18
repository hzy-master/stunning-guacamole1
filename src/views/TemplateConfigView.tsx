import React, { useState } from 'react';
import { Calendar } from 'lucide-react';
import Pagination from '../components/Pagination';
import CreateInspectionTemplateModal from './CreateInspectionTemplateModal';

const templateData = [
  { id: 'mb-01', name: '配电房巡检模板', relCount: 6, count: 20, updateTime: '2025-12-20 14:04:08' },
  { id: 'mb-02', name: '水泵房巡检模板', relCount: 7, count: 14, updateTime: '2025-12-20 14:05:08' },
  { id: 'mb-03', name: '楼栋网格化巡检模板', relCount: 8, count: 34, updateTime: '2025-12-21 14:04:00' },
  { id: 'mb-04', name: '公共区域巡检模板', relCount: 6, count: 10, updateTime: '2025-12-23 09:01:08' },
];

export default function TemplateConfigView() {
  const [showCreateModal, setShowCreateModal] = useState(false);

  return (
    <>
      {/* Filter Bar */}
      <div className="flex justify-between items-center mb-5">
        <div className="flex space-x-3 items-center">
          <input 
              type="text" 
              placeholder="请输入模板名称" 
              className="border border-[#e2e5e9] rounded-[4px] px-3 py-1.5 text-[13px] w-[200px] focus:outline-blue-500 placeholder-[#999] bg-white transition-shadow" 
          />

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
            onClick={() => setShowCreateModal(true)}
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
              <th className="py-3 px-4 font-semibold w-[15%]">模板编码</th>
              <th className="py-3 px-4 font-semibold w-[25%]">模板名称</th>
              <th className="py-3 px-4 font-semibold w-[12%]">关联对象数</th>
              <th className="py-3 px-4 font-semibold w-[12%]">巡检项数量</th>
              <th className="py-3 px-4 font-semibold w-[20%]">最后更新时间</th>
              <th className="py-3 px-4 font-semibold w-[15%]">操作</th>
            </tr>
          </thead>
          <tbody className="text-[13px] text-[#444]">
            {templateData.map((row, i) => (
              <tr key={i} className="border-b border-[#f5f5f5] hover:bg-[#fafafc] transition-colors">
                <td className="py-3.5 px-4"><input type="checkbox" className="w-[14px] h-[14px] border-gray-300 rounded text-blue-600 focus:ring-blue-500 cursor-pointer" /></td>
                <td className="py-3.5 px-4">{row.id}</td>
                <td className="py-3.5 px-4">{row.name}</td>
                <td className="py-3.5 px-4">{row.relCount}</td>
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
        <CreateInspectionTemplateModal onClose={() => setShowCreateModal(false)} />
      )}
    </>
  );
}
