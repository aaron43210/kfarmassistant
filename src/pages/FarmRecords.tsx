import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, Trash2, Calendar, IndianRupee, Sprout } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface FarmRecord {
  id: string;
  fieldName: string;
  crop: string;
  sowingDate: string;
  harvestDate?: string;
  area: number;
  yield?: number;
}

interface Expense {
  id: string;
  date: string;
  category: string;
  description: string;
  amount: number;
}

const FarmRecords = () => {
  const { t, language } = useLanguage();
  const [records, setRecords] = useState<FarmRecord[]>([]);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  
  // Form states
  const [newRecord, setNewRecord] = useState({
    fieldName: '',
    crop: '',
    sowingDate: '',
    area: ''
  });
  
  const [newExpense, setNewExpense] = useState({
    date: new Date().toISOString().split('T')[0],
    category: '',
    description: '',
    amount: ''
  });

  const crops = language === 'ml' 
    ? ['നെല്ല്', 'തരക്കരി', 'റബ്ബർ', 'കശുമാവ്', 'കുരുമുളക്']
    : ['Rice', 'Vegetables', 'Rubber', 'Cashew', 'Pepper'];

  const expenseCategories = language === 'ml'
    ? ['വിത്ത്', 'വളം', 'കീടനാശിനി', 'തൊഴിൽ', 'ഉപകരണം', 'മറ്റുള്ളവ']
    : ['Seeds', 'Fertilizers', 'Pesticides', 'Labor', 'Equipment', 'Other'];

  const addRecord = () => {
    if (!newRecord.fieldName || !newRecord.crop || !newRecord.sowingDate || !newRecord.area) {
      toast({
        title: language === 'ml' ? 'പിശക്' : 'Error',
        description: language === 'ml' ? 'എല്ലാ ഫീൽഡുകളും പൂരിപ്പിക്കുക' : 'Please fill all fields',
        variant: 'destructive'
      });
      return;
    }

    const record: FarmRecord = {
      id: Date.now().toString(),
      fieldName: newRecord.fieldName,
      crop: newRecord.crop,
      sowingDate: newRecord.sowingDate,
      area: parseFloat(newRecord.area)
    };

    setRecords([...records, record]);
    setNewRecord({ fieldName: '', crop: '', sowingDate: '', area: '' });
    
    toast({
      title: language === 'ml' ? 'വിജയം' : 'Success',
      description: language === 'ml' ? 'രേഖ ചേർത്തു' : 'Record added successfully'
    });
  };

  const addExpense = () => {
    if (!newExpense.category || !newExpense.description || !newExpense.amount) {
      toast({
        title: language === 'ml' ? 'പിശക്' : 'Error',
        description: language === 'ml' ? 'എല്ലാ ഫീൽഡുകളും പൂരിപ്പിക്കുക' : 'Please fill all fields',
        variant: 'destructive'
      });
      return;
    }

    const expense: Expense = {
      id: Date.now().toString(),
      date: newExpense.date,
      category: newExpense.category,
      description: newExpense.description,
      amount: parseFloat(newExpense.amount)
    };

    setExpenses([...expenses, expense]);
    setNewExpense({ 
      date: new Date().toISOString().split('T')[0], 
      category: '', 
      description: '', 
      amount: '' 
    });
    
    toast({
      title: language === 'ml' ? 'വിജയം' : 'Success',
      description: language === 'ml' ? 'ചെലവ് ചേർത്തു' : 'Expense added successfully'
    });
  };

  const deleteRecord = (id: string) => {
    setRecords(records.filter(r => r.id !== id));
    toast({
      title: language === 'ml' ? 'ഇല്ലാതാക്കി' : 'Deleted',
      description: language === 'ml' ? 'രേഖ ഇല്ലാതാക്കി' : 'Record deleted'
    });
  };

  const deleteExpense = (id: string) => {
    setExpenses(expenses.filter(e => e.id !== id));
    toast({
      title: language === 'ml' ? 'ഇല്ലാതാക്കി' : 'Deleted',
      description: language === 'ml' ? 'ചെലവ് ഇല്ലാതാക്കി' : 'Expense deleted'
    });
  };

  const totalExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0);

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold text-primary mb-3">
            {language === 'ml' ? 'കൃഷി രേഖകൾ' : 'Farm Records'}
          </h1>
          <p className="text-muted-foreground text-lg">
            {language === 'ml' 
              ? 'നിങ്ങളുടെ വയലുകൾ, വിളകൾ, ചെലവുകൾ എന്നിവ ട്രാക്ക് ചെയ്യുക' 
              : 'Track your fields, crops, and expenses'}
          </p>
        </div>

        <Tabs defaultValue="crops" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 lg:w-[400px]">
            <TabsTrigger value="crops">
              <Sprout className="h-4 w-4 mr-2" />
              {language === 'ml' ? 'വിളകൾ' : 'Crops'}
            </TabsTrigger>
            <TabsTrigger value="expenses">
              <IndianRupee className="h-4 w-4 mr-2" />
              {language === 'ml' ? 'ചെലവുകൾ' : 'Expenses'}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="crops" className="space-y-6">
            {/* Add Crop Record Form */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plus className="h-5 w-5" />
                  {language === 'ml' ? 'പുതിയ വിള രേഖ' : 'Add Crop Record'}
                </CardTitle>
                <CardDescription>
                  {language === 'ml' ? 'വിളയുടെ വിശദാംശങ്ങൾ നൽകുക' : 'Enter crop details'}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fieldName">{language === 'ml' ? 'വയൽ പേര്' : 'Field Name'}</Label>
                    <Input
                      id="fieldName"
                      value={newRecord.fieldName}
                      onChange={(e) => setNewRecord({...newRecord, fieldName: e.target.value})}
                      placeholder={language === 'ml' ? 'ഉദാ: വടക്കെ വയൽ' : 'e.g., North Field'}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>{language === 'ml' ? 'വിള' : 'Crop'}</Label>
                    <Select value={newRecord.crop} onValueChange={(val) => setNewRecord({...newRecord, crop: val})}>
                      <SelectTrigger>
                        <SelectValue placeholder={language === 'ml' ? 'തിരഞ്ഞെടുക്കുക' : 'Select crop'} />
                      </SelectTrigger>
                      <SelectContent>
                        {crops.map((crop) => (
                          <SelectItem key={crop} value={crop}>{crop}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="sowingDate">{language === 'ml' ? 'നടീൽ തീയതി' : 'Sowing Date'}</Label>
                    <Input
                      id="sowingDate"
                      type="date"
                      value={newRecord.sowingDate}
                      onChange={(e) => setNewRecord({...newRecord, sowingDate: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="area">{language === 'ml' ? 'വിസ്തീർണം (ഏക്കർ)' : 'Area (acres)'}</Label>
                    <Input
                      id="area"
                      type="number"
                      step="0.1"
                      value={newRecord.area}
                      onChange={(e) => setNewRecord({...newRecord, area: e.target.value})}
                      placeholder="0.0"
                    />
                  </div>
                </div>
                <Button onClick={addRecord} className="w-full">
                  <Plus className="h-4 w-4 mr-2" />
                  {language === 'ml' ? 'രേഖ ചേർക്കുക' : 'Add Record'}
                </Button>
              </CardContent>
            </Card>

            {/* Crop Records List */}
            <div className="grid gap-4">
              {records.length === 0 ? (
                <Card>
                  <CardContent className="py-12 text-center text-muted-foreground">
                    {language === 'ml' ? 'ഇതുവരെ രേഖകളൊന്നുമില്ല' : 'No records yet'}
                  </CardContent>
                </Card>
              ) : (
                records.map((record) => (
                  <Card key={record.id}>
                    <CardContent className="pt-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-lg font-semibold text-primary">{record.fieldName}</h3>
                          <p className="text-muted-foreground">{record.crop}</p>
                        </div>
                        <Button variant="ghost" size="icon" onClick={() => deleteRecord(record.id)}>
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground">{language === 'ml' ? 'നടീൽ തീയതി' : 'Sowing Date'}</p>
                          <p className="font-medium flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {new Date(record.sowingDate).toLocaleDateString()}
                          </p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">{language === 'ml' ? 'വിസ്തീർണം' : 'Area'}</p>
                          <p className="font-medium">{record.area} {language === 'ml' ? 'ഏക്കർ' : 'acres'}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>

          <TabsContent value="expenses" className="space-y-6">
            {/* Summary Card */}
            <Card className="bg-primary text-primary-foreground">
              <CardContent className="pt-6">
                <p className="text-sm opacity-90 mb-1">
                  {language === 'ml' ? 'ആകെ ചെലവ്' : 'Total Expenses'}
                </p>
                <p className="text-3xl font-bold flex items-center gap-1">
                  <IndianRupee className="h-6 w-6" />
                  {totalExpenses.toLocaleString('en-IN')}
                </p>
              </CardContent>
            </Card>

            {/* Add Expense Form */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plus className="h-5 w-5" />
                  {language === 'ml' ? 'പുതിയ ചെലവ്' : 'Add Expense'}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="expenseDate">{language === 'ml' ? 'തീയതി' : 'Date'}</Label>
                    <Input
                      id="expenseDate"
                      type="date"
                      value={newExpense.date}
                      onChange={(e) => setNewExpense({...newExpense, date: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>{language === 'ml' ? 'വിഭാഗം' : 'Category'}</Label>
                    <Select value={newExpense.category} onValueChange={(val) => setNewExpense({...newExpense, category: val})}>
                      <SelectTrigger>
                        <SelectValue placeholder={language === 'ml' ? 'തിരഞ്ഞെടുക്കുക' : 'Select category'} />
                      </SelectTrigger>
                      <SelectContent>
                        {expenseCategories.map((cat) => (
                          <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">{language === 'ml' ? 'വിവരണം' : 'Description'}</Label>
                    <Input
                      id="description"
                      value={newExpense.description}
                      onChange={(e) => setNewExpense({...newExpense, description: e.target.value})}
                      placeholder={language === 'ml' ? 'ഉദാ: യൂറിയ വളം' : 'e.g., Urea fertilizer'}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="amount">{language === 'ml' ? 'തുക (₹)' : 'Amount (₹)'}</Label>
                    <Input
                      id="amount"
                      type="number"
                      value={newExpense.amount}
                      onChange={(e) => setNewExpense({...newExpense, amount: e.target.value})}
                      placeholder="0"
                    />
                  </div>
                </div>
                <Button onClick={addExpense} className="w-full">
                  <Plus className="h-4 w-4 mr-2" />
                  {language === 'ml' ? 'ചെലവ് ചേർക്കുക' : 'Add Expense'}
                </Button>
              </CardContent>
            </Card>

            {/* Expenses List */}
            <div className="space-y-3">
              {expenses.length === 0 ? (
                <Card>
                  <CardContent className="py-12 text-center text-muted-foreground">
                    {language === 'ml' ? 'ഇതുവരെ ചെലവുകളൊന്നുമില്ല' : 'No expenses yet'}
                  </CardContent>
                </Card>
              ) : (
                expenses.map((expense) => (
                  <Card key={expense.id}>
                    <CardContent className="pt-6">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-xs bg-muted px-2 py-1 rounded">{expense.category}</span>
                            <span className="text-xs text-muted-foreground">
                              {new Date(expense.date).toLocaleDateString()}
                            </span>
                          </div>
                          <p className="font-medium mb-1">{expense.description}</p>
                          <p className="text-lg font-bold text-primary flex items-center gap-1">
                            <IndianRupee className="h-4 w-4" />
                            {expense.amount.toLocaleString('en-IN')}
                          </p>
                        </div>
                        <Button variant="ghost" size="icon" onClick={() => deleteExpense(expense.id)}>
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default FarmRecords;
