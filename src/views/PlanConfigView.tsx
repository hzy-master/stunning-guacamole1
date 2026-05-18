import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import Pagination from '../components/Pagination';
import CreateInspectionPlanModal from './CreateInspectionPlanModal';

const planData = [
  { id: 'xj-jh-01', name: '中心配电房每日巡检', period: '每天', assignee: '林零', nextTime: '2026-03-20 00:00', status: '生效中' },
  { id: 'xj-jh-02', name: '教学楼每月巡检', period: '每月', assignee: '周林鹏', nextTime: '2026-04-12 08:00', status: '已失效' },
  { id: 'xj-jh-03', name: '普通配电房每周巡检', period: '每周', assignee: '林零', nextTime: '2026-03-24 12:00', status: '生效中' },
];

const PlanStatusBadge = ({ status }: { status: string }) => {
  if (status === '生效中') {
    return (
      <span className="bg-[#3b7fed] text-white text-[12px] px-2 py-[2px] rounded-full inline-flex items-center justify-center min-w-[50px] font-medium">
        {status}
      </span>
    );
  }
  return (
    <span className="bg-[#f0f2f5] text-[#888] text-[12px] px-2 py-[2px] rounded-full inline-flex items-center justify-center min-w-[50px] border border-transparent font-medium">
      {status}
    </span>
  );
};

export default function PlanConfigView() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  return (
    <>
      {/* Filter Bar */}
      <div className="flex justify-between items-center mb-5">
        <div className="flex space-x-3 items-center">
          <input 
              type="text" 
              placeholder="请输入计划名称" 
              className="border border-[#e2e5e9] rounded-[4px] px-3 py-1.5 text-[13px] w-[200px] focus:outline-blue-500 placeholder-[#999] bg-white transition-shadow" 
          />

          <div className="relative">
            <select className="appearance-none border border-[#e2e5e9] rounded-[4px] pl-3 pr-8 py-1.5 text-[13px] w-[160px] focus:outline-blue-500 bg-white text-[#555] cursor-pointer">
              <option>请选择执行人</option>
            </select>
            <ChevronDown size={14} className="absolute right-2.5 top-2 text-[#999] pointer-events-none" />
          </div>

          <div className="relative">
            <select className="appearance-none border border-[#e2e5e9] rounded-[4px] pl-3 pr-8 py-1.5 text-[13px] w-[160px] focus:outline-blue-500 bg-white text-[#555] cursor-pointer">
              <option>请选择计划状态</option>
            </select>
            <ChevronDown size={14} className="absolute right-2.5 top-2 text-[#999] pointer-events-none" />
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
            className="bg-[#3b7fed] text-white px-5 py-1.5 rounded-[4px] text-[13px] hover:bg-blue-600 active:scale-95 transition-all h-[32px] flex items-center justify-center shadow-sm font-medium mr-12 cursor-pointer"
            onClick={() => setIsCreateModalOpen(true)}
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
              <th className="py-3 px-4 font-semibold w-[13%]">计划编码</th>
              <th className="py-3 px-4 font-semibold w-[20%]">计划名称</th>
              <th className="py-3 px-4 font-semibold w-[10%]">执行周期</th>
              <th className="py-3 px-4 font-semibold w-[10%]">执行人</th>
              <th className="py-3 px-4 font-semibold w-[18%]">下次任务生成时间</th>
              <th className="py-3 px-4 font-semibold w-[12%]">计划状态</th>
              <th className="py-3 px-4 font-semibold w-[15%]">操作</th>
            </tr>
          </thead>
          <tbody className="text-[13px] text-[#444]">
            {planData.map((row, i) => (
              <tr key={i} className="border-b border-[#f5f5f5] hover:bg-[#fafafc] transition-colors">
                <td className="py-3.5 px-4"><input type="checkbox" className="w-[14px] h-[14px] border-gray-300 rounded text-blue-600 focus:ring-blue-500 cursor-pointer" /></td>
                <td className="py-3.5 px-4">{row.id}</td>
                <td className="py-3.5 px-4">{row.name}</td>
                <td className="py-3.5 px-4">{row.period}</td>
                <td className="py-3.5 px-4">{row.assignee}</td>
                <td className="py-3.5 px-4">{row.nextTime}</td>
                <td className="py-3.5 px-4">
                  <PlanStatusBadge status={row.status} />
                </td>
                <td className="py-3.5 px-4 flex items-center space-x-2 select-none h-full mt-0.5">
                  <button className="border border-[#e5e7eb] text-gray-600 px-[14px] py-1 rounded shadow-sm hover:bg-gray-50 focus:outline-none active:scale-95 transition-all bg-white cursor-pointer">
                    查看
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

      {isCreateModalOpen && (
        <CreateInspectionPlanModal onClose={() => setIsCreateModalOpen(false)} />
      )}
    </>
  );
}
