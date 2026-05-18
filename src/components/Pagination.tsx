import React from 'react';
import { ChevronDown } from 'lucide-react';

export default function Pagination() {
  return (
    <div className="flex justify-between items-center text-[13px] text-[#666] pt-1">
      <span>共 6 条记录</span>
      <div className="flex items-center space-x-1.5">
        <button className="w-7 h-7 border border-[#e2e5e9] rounded bg-white text-[#999] flex items-center justify-center hover:text-[#555] transition-colors">&lt;</button>
        <button className="w-7 h-7 border border-[#e2e5e9] rounded bg-white text-[#555] flex items-center justify-center hover:bg-[#f9fafb] transition-colors">1</button>
        <button className="w-7 h-7 border border-[#e2e5e9] rounded bg-white text-[#555] flex items-center justify-center hover:bg-[#f9fafb] transition-colors">2</button>
        <button className="w-7 h-7 border border-[#e2e5e9] rounded bg-white text-[#555] flex items-center justify-center hover:bg-[#f9fafb] transition-colors">3</button>
        <button className="w-7 h-7 border border-[#e2e5e9] rounded bg-white text-[#555] flex items-center justify-center hover:bg-[#f9fafb] transition-colors">4</button>
        <button className="w-7 h-7 border border-transparent rounded text-[#555] flex items-center justify-center bg-[#f2f4f7] font-medium">5</button>
        <button className="w-7 h-7 border border-[#e2e5e9] rounded bg-white text-[#555] flex items-center justify-center hover:bg-[#f9fafb] transition-colors">6</button>
        <button className="w-7 h-7 border border-[#e2e5e9] rounded bg-white text-[#555] flex items-center justify-center hover:bg-[#f9fafb] transition-colors">7</button>
        <button className="w-7 h-7 border border-[#e2e5e9] rounded bg-white text-[#555] flex items-center justify-center hover:bg-[#f9fafb] transition-colors">8</button>
        <button className="w-7 h-7 border border-[#e2e5e9] rounded bg-white text-[#555] flex items-center justify-center hover:bg-[#f9fafb] transition-colors">9</button>
        <button className="w-7 h-7 border border-[#e2e5e9] rounded bg-white text-[#999] flex items-center justify-center hover:text-[#555] transition-colors">&gt;</button>
        
        <div className="relative ml-2">
          <select className="appearance-none border border-[#e2e5e9] rounded pl-2.5 pr-6 py-[3px] bg-white text-[#555] cursor-pointer h-7 focus:outline-blue-500 outline-none hover:border-gray-300 transition-colors">
            <option>10条/页</option>
          </select>
          <ChevronDown size={14} className="absolute right-1.5 top-[7px] text-[#999] pointer-events-none" />
        </div>
        
        <div className="flex items-center ml-4">
          <span className="text-[#666]">跳至</span>
          <input type="text" defaultValue="5" className="border border-[#e2e5e9] rounded w-9 text-center mx-1.5 h-7 focus:outline-blue-500 bg-white outline-none hover:border-gray-300 transition-colors" />
          <span className="text-[#666]">页</span>
        </div>
      </div>
    </div>
  );
}
