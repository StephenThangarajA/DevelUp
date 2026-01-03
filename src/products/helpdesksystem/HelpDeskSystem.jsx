import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Dashboard from './pages/Dashboard/Dashboard';
import Tickets from './pages/Tickets/Tickets';
import CreateTicket from './pages/CreateTicket/CreateTicket';
import TicketDetail from './pages/TicketDetail/TicketDetail';
import Customers from './pages/Customers/Customers';
import CreateCustomer from './pages/CreateCustomer/CreateCustomer';
import CustomerDetail from './pages/CustomerDetail/CustomerDetail';
import Agents from './pages/Agents/Agents';
import CreateAgent from './pages/CreateAgent/CreateAgent';
import AgentDetail from './pages/AgentDetail/AgentDetail';
import SendMessage from './pages/SendMessage/SendMessage';
import './styles/HelpDeskSystem.css';
import { helpdesk, authMe } from '../../lib/api.js';

function HelpDeskSystem() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [tickets, setTickets] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [agents, setAgents] = useState([]);

    useEffect(() => {
        const load = async () => {
            try {
                const me = await authMe();
                if (!me || me.role !== 'STARTUP_ADMIN') {
                    window.location.href = '/login';
                    return;
                }
                const [a, c, t] = await Promise.all([
                    helpdesk.agents.list(),
                    helpdesk.customers.list(),
                    helpdesk.tickets.list()
                ]);
                setAgents(a);
                setCustomers(c);
                const mapped = t.map(x => ({
                    ...x,
                    id: x.code,
                    tid: x.id,
                    customer: x.customer?.name || '',
                    customerEmail: x.customer?.email || '',
                    assignee: x.assignee?.name || x.assigneeId || ''
                }));
                setTickets(mapped);
                setLoading(false);
            } catch (e) {
                setError('Failed to load helpdesk data');
                setLoading(false);
            }
        };
        load();
    }, []);

    const addAgent = async (agentData) => {
        const created = await helpdesk.agents.create(agentData);
        setAgents(prev => [...prev, created]);
        return created;
    };

    const addTicket = async (ticketData) => {
        const created = await helpdesk.tickets.create(ticketData);
        const mapped = {
            ...created,
            id: created.code,
            tid: created.id,
            customer: created.customer?.name || '',
            customerEmail: created.customer?.email || '',
            assignee: created.assignee?.name || created.assigneeId || ''
        };
        setTickets(prev => [mapped, ...prev]);
        if (created.customerId) {
            setCustomers(prev => prev.map(c => c.id === created.customerId ? { ...c, ticketsCount: (c.ticketsCount || 0) + 1 } : c));
        }
        return mapped;
    };

    const addCustomer = async (customerData) => {
        const created = await helpdesk.customers.create(customerData);
        setCustomers(prev => [...prev, created]);
        return created;
    };

    const updateTicket = async (ticketId, updates) => {
        const found = tickets.find(t => t.id === ticketId);
        const tid = found?.tid || ticketId;
        const updated = await helpdesk.tickets.update(tid, updates);
        const mapped = {
            ...updated,
            id: updated.code,
            tid: updated.id,
            customer: updated.customer?.name || '',
            customerEmail: updated.customer?.email || '',
            assignee: updated.assignee?.name || updated.assigneeId || ''
        };
        setTickets(prev => prev.map(t => t.id === ticketId ? mapped : t));
    };

    if (loading) {
        return <div className="app"><Navbar /><main className="main-content"><div className="card"><h3>Loading...</h3></div></main></div>;
    }
    if (error) {
        return <div className="app"><Navbar /><main className="main-content"><div className="card"><h3>{error}</h3></div></main></div>;
    }
    return (
        <div className="app">
            <Navbar />

            <main className="main-content">
                <Routes>
                    <Route index element={<Navigate to="dashboard" replace />} />
                    <Route path="dashboard" element={<Dashboard tickets={tickets} customers={customers} agents={agents} />} />
                    <Route path="tickets" element={<Tickets tickets={tickets} agents={agents} onUpdateTicket={updateTicket} />} />
                    <Route path="tickets/new" element={<CreateTicket customers={customers} agents={agents} onCreateTicket={addTicket} />} />
                    <Route path="tickets/:id" element={<TicketDetail tickets={tickets} agents={agents} onUpdateTicket={updateTicket} />} />
                    <Route path="customers" element={<Customers customers={customers} />} />
                    <Route path="customers/new" element={<CreateCustomer onCreateCustomer={addCustomer} />} />
                    <Route path="customers/:id" element={<CustomerDetail customers={customers} tickets={tickets} />} />
                    <Route path="agents" element={<Agents agents={agents} />} />
                    <Route path="agents/new" element={<CreateAgent onCreateAgent={addAgent} />} />
                    <Route path="agents/:id" element={<AgentDetail agents={agents} tickets={tickets} />} />
                    <Route path="messages/new/:agentId" element={<SendMessage />} />
                </Routes>
            </main>
        </div>
    );
}

export default HelpDeskSystem;
