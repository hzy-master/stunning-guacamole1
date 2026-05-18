import React, { useState } from 'react';
import { X, Search, ChevronRight, ChevronDown, Zap } from 'lucide-react';

interface CreateInspectionTemplateModalProps {
  onClose: () => void;
}

interface InspectionItem {
  id: string;
  name: string;
  type: string;
  standard: string;
  photo: boolean;
  checked: boolean;
}

interface InspectionObject {
  id: string;
  name: string;
  items: InspectionItem[];
  itemCount: number;
}

interface Category {
  id: string;
  name: string;
  objects: InspectionObject[];
  isOpen: boolean;
}

const INITIAL_CATEGORIES: Category[] = [
  {
    id: 'c1',
    name: '配电系统',
    isOpen: false,
    objects: [
      {
        id: 'o1',
        name: '变压器',
        itemCount: 0,
        items: [
          { id: 'i1', name: '变压器指示灯是否正常', type: '单选', standard: '正常', photo: false, checked: true },
          { id: 'i2', name: '是否有异常电磁轰鸣声或放电声', type: '单选', standard: '无', photo: true, checked: false },
          { id: 'i3', name: '温控仪温度是否在正常范围内', type: '数值', standard: '50-80℃', photo: false, checked: false },
        ]
      },
      { id: 'o2', name: '直流屏', itemCount: 0, items: [] },
      { id: 'o3', name: '电容柜', itemCount: 0, items: [] },
      { id: 'o4', name: '电能表', itemCount: 0, items: [] },
    ]
  },
  {
    id: 'c2',
    name: '用水系统',
    isOpen: false,
    objects: []
  },
  {
    id: 'c3',
    name: '用气系统',
    isOpen: false,
    objects: []
  },
  {
    id: 'c4',
    name: '环控系统',
    isOpen: false,
    objects: []
  },
  {
    id: 'c5',
    name: '空调系统',
    isOpen: false,
    objects: []
  },
  {
    id: 'c6',
    name: '照明系统',
    isOpen: false,
    objects: []
  },
  {
    id: 'c7',
    name: '终端用电系统',
    isOpen: false,
    objects: []
  },
  {
    id: 'c8',
    name: '环境',
    isOpen: false,
    objects: [
      { id: 'oe1', name: '配电房环境', itemCount: 0, items: [] },
      { id: 'oe2', name: '水泵房环境', itemCount: 0, items: [] },
    ]
  }
];

export default function CreateInspectionTemplateModal({ onClose }: CreateInspectionTemplateModalProps) {
  const [templateName, setTemplateName] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [categories, setCategories] = useState<Category[]>(INITIAL_CATEGORIES);
  const [selectedObjectId, setSelectedObjectId] = useState<string | null>(null);
  
  // Flattened items state for simplicity in a demo
  const [items, setItems] = useState<InspectionItem[]>(INITIAL_CATEGORIES[0].objects[0].items);

  const isTemplateNameTarget = templateName === '配电房每日巡检模板';

  // State sync when template name changes
  React.useEffect(() => {
    if (isTemplateNameTarget) {
      setCategories(prev => prev.map(c => {
        if (c.id === 'c1') return { 
          ...c, 
          isOpen: false, 
          objects: c.objects.map(obj => {
            if (obj.id === 'o1') return { ...obj, itemCount: 3 };
            if (obj.id === 'o4') return { ...obj, itemCount: 2 };
            return obj;
          })
        };
        if (c.id === 'c8') return { 
          ...c, 
          isOpen: false, 
          objects: c.objects.map(obj => {
            if (obj.id === 'oe1') return { ...obj, itemCount: 3 };
            return obj;
          })
        };
        return c;
      }));
      setSelectedObjectId('o1');
      setItems(INITIAL_CATEGORIES[0].objects[0].items);
    } else {
      setCategories(INITIAL_CATEGORIES);
      setSelectedObjectId(null);
      setItems([]);
    }
  }, [isTemplateNameTarget]);

  const toggleCategory = (id: string) => {
    setCategories(categories.map(c => ({
      ...c,
      isOpen: c.id === id ? !c.isOpen : false
    })));
  };

  const handleSelectObject = (id: string, categoryId: string) => {
    setSelectedObjectId(id);
    // Collapse other categories when an object is selected
    setCategories(categories.map(c => ({
      ...c,
      isOpen: c.id === categoryId
    })));
    
    if (id === 'o1') {
      setItems(INITIAL_CATEGORIES[0].objects[0].items);
    } else {
      setItems([]);
    }
  };

  const toggleItem = (id: string) => {
    setItems(items.map(item => item.id === id ? { ...item, checked: !item.checked } : item));
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-in fade-in duration-200">
      <div className="bg-white rounded-[8px] w-[1000px] h-[720px] flex flex-col overflow-hidden shadow-2xl relative">
        {/* Header */}
        <div className="flex justify-between items-center px-6 h-[56px] border-b border-[#f0f0f0]">
          <h2 className="text-[16px] font-bold text-[#333]">新增巡检模板</h2>
          <button onClick={onClose} className="text-[#999] hover:text-[#333] transition-colors cursor-pointer">
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-hidden px-10 py-6 custom-scrollbar">
          {/* Section: Template Info */}
          <section className="mb-8">
            <div className="flex items-center mb-6">
              <div className="w-[3px] h-[16px] bg-[#3b7fed] mr-2"></div>
              <h3 className="text-[15px] font-bold text-[#333]">模板信息</h3>
            </div>
            <div className="flex items-baseline space-x-4 pl-2">
              <label className="text-[14px] text-[#333] w-[70px] shrink-0">
                <span className="text-[#f5222d] mr-1">*</span>模板名称
              </label>
              <input 
                type="text" 
                value={templateName}
                onChange={(e) => setTemplateName(e.target.value)}
                placeholder="请输入，示例：配电房每日巡检模板"
                className="w-[450px] border border-[#dcdfe6] rounded-[4px] h-[36px] px-3 text-[14px] outline-none focus:border-[#3b7fed] transition-all placeholder-[#999]"
              />
            </div>
          </section>

          {/* Section: Configuration */}
          <section className="flex flex-col h-[480px]">
            <div className="flex items-center mb-6">
              <div className="w-[3px] h-[16px] bg-[#3b7fed] mr-2"></div>
              <h3 className="text-[15px] font-bold text-[#333]">配置巡检内容</h3>
            </div>
            
            <div className="flex flex-1 border border-[#f0f0f0] rounded-[4px] overflow-hidden">
              {/* Left Side: Object List */}
              <div className="w-[220px] bg-[#f7f8fa] flex flex-col border-r border-[#f0f0f0]">
                <div className="flex justify-between items-center px-4 py-3 bg-white">
                  <span className="text-[13px] font-bold text-[#333]">巡检对象</span>
                  <span className="text-[12px] text-[#999]">共 <span className="text-[#3b7fed]">{isTemplateNameTarget ? 3 : 0}</span> 个</span>
                </div>
                <div className="px-3 py-2 bg-white">
                  <div className="relative">
                    <Search size={14} className="absolute left-2.5 top-2.5 text-[#999]" />
                    <input 
                      type="text" 
                      placeholder="搜索巡检对象名称"
                      className="w-full bg-[#f8f9fb] border border-[#e2e5e9] rounded-[4px] h-[28px] pl-8 pr-2 text-[12px] outline-none focus:border-[#3b7fed]"
                    />
                  </div>
                </div>
                
                <div className="flex-1 overflow-y-auto no-scrollbar py-2">
                  {categories.map((cat) => (
                    <div key={cat.id} className="mb-1">
                      <button 
                        onClick={() => toggleCategory(cat.id)}
                        className="w-full flex items-center px-3 py-1.5 hover:bg-[#ebf3ff] text-[13px] text-[#333] transition-colors group"
                      >
                        {cat.isOpen ? <ChevronDown size={14} className="mr-1 text-[#999]" /> : <ChevronRight size={14} className="mr-1 text-[#999]" />}
                        <span className="font-medium">{cat.name}</span>
                      </button>
                      
                      {cat.isOpen && cat.objects.length > 0 && (
                        <div className="bg-[#f0f5ff]/30">
                          {cat.objects.map(obj => (
                            <button 
                              key={obj.id}
                              onClick={() => handleSelectObject(obj.id, cat.id)}
                              className={`w-full flex justify-between items-center pl-8 pr-4 py-2 hover:bg-[#ebf3ff] text-[12px] transition-colors ${selectedObjectId === obj.id ? 'bg-[#ebf3ff] text-[#3b7fed]' : 'text-[#555]'}`}
                            >
                              <div className="flex items-center">
                                {obj.id === 'o1' && <Zap size={10} className="mr-1.5 text-[#ff9900] fill-[#ff9900]" />}
                                {obj.name}
                              </div>
                              <span className={`px-2 py-0.5 rounded-full text-[10px] ${obj.itemCount > 0 ? 'bg-[#3b7fed] text-white' : 'bg-[#e0e0e0] text-[#888]'}`}>
                                {obj.itemCount}
                              </span>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                  {/* Additional padding-bottom for scroll */}
                  <div className="h-4"></div>
                </div>
              </div>

              {/* Right Side: Content Area */}
              <div className="flex-1 flex flex-col bg-white overflow-hidden relative">
                {!isTemplateNameTarget ? (
                  <div className="flex flex-col items-center justify-center h-full text-[#999]">
                    <p className="text-[14px]">请先输入模板名称，再选择巡检对象。</p>
                  </div>
                ) : (
                  <div className="p-4 flex flex-col h-full">
                    {/* Items Table */}
                    <div className="flex-1 overflow-y-auto border border-[#f0f2f5] rounded-[4px]">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="bg-[#fcfdff] text-[#333] text-[13px] font-medium border-b border-[#f0f2f5]">
                            <th className="py-2.5 px-4 w-[50px]"><input type="checkbox" className="w-[14px] h-[14px] border-gray-300 rounded text-blue-600 focus:ring-blue-500 cursor-pointer" /></th>
                            <th className="py-2.5 px-4">巡检项名称 <span className="text-[#999] ml-2 font-normal">已选 3/3</span></th>
                            <th className="py-2.5 px-4 w-[110px] text-center">巡检标准</th>
                            <th className="py-2.5 px-4 w-[80px] text-center">拍照</th>
                            <th className="py-2.5 px-4 w-[50px]"><ChevronDown size={20} className="text-[#999] rotate-180" /></th>
                          </tr>
                        </thead>
                        <tbody className="text-[13px] text-[#444]">
                          {items.map((item) => (
                            <tr key={item.id} className="border-b border-[#fcfdff] hover:bg-[#fafafc] transition-colors group h-[48px]">
                              <td className="py-2 px-4">
                                <input 
                                  type="checkbox" 
                                  checked={item.checked}
                                  onChange={() => toggleItem(item.id)}
                                  className="w-[14px] h-[14px] border-gray-300 rounded text-blue-600 focus:ring-blue-500 cursor-pointer" 
                                />
                              </td>
                              <td className="py-2 px-4">
                                <div className="flex items-center justify-between">
                                  <span>{item.name}</span>
                                  <div className="w-[80px] flex justify-end pr-0">
                                    <span className={`px-3 py-0.5 rounded-[4px] text-[12px] ${item.type === '单选' ? 'bg-[#f6ffed] text-[#3c8e0d] border border-[#b7eb8f]' : 'bg-[#e6f7ff] text-[#1890ff] border border-[#91d5ff]'}`}>
                                      {item.type}
                                    </span>
                                  </div>
                                </div>
                              </td>
                              <td className="py-2 px-4 text-center text-[#666]">{item.standard}</td>
                              <td className="py-2 px-4 text-center">
                                {item.photo && <span className="font-serif">√</span>}
                              </td>
                              <td className="py-2 px-4"></td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    {/* Shadow for scroll bar area */}
                    <div className="absolute right-3 top-[10%] bottom-[10%] w-[6px] bg-[#e0e0e0]/20 rounded-full"></div>
                  </div>
                )}
              </div>
            </div>
          </section>
        </div>

        {/* Footer */}
        <div className="px-10 h-[64px] border-t border-[#f0f0f0] flex items-center justify-between bg-white">
          <div className="text-[13px] text-[#999]">
            已选择巡检对象数量：<span className="text-[#3b7fed]">{isTemplateNameTarget ? 3 : 0}</span> 个，
            已勾选巡检项数量：<span className="text-[#3b7fed]">{isTemplateNameTarget ? 8 : 0}</span> 条
          </div>
          <div className="flex space-x-3">
            <button 
              onClick={onClose}
              className="px-6 py-2 border border-[#d9d9d9] bg-white text-[#333] rounded-[4px] text-[14px] hover:border-[#3b7fed] hover:text-[#3b7fed] transition-all active:scale-95 cursor-pointer"
            >
              取消
            </button>
            <button 
              className="px-6 py-2 bg-[#3b7fed] text-white rounded-[4px] text-[14px] hover:bg-blue-600 transition-all active:scale-95 shadow-sm cursor-pointer"
            >
              保存
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
