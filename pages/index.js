import { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut
} from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCKWxZhLhX43L1vIl1nAiE69lnkutd5QWA",
  authDomain: "painel-apostas.firebaseapp.com",
  projectId: "painel-apostas",
  storageBucket: "painel-apostas.firebasestorage.app",
  messagingSenderId: "921374000669",
  appId: "1:921374000669:web:57e0c7b2e62b4d362368f4",
  measurementId: "G-P21DZRKXZP"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default function Home() {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (usuario) => {
      setUser(usuario);
    });
    return () => unsubscribe();
  }, []);

  const login = () => {
    signInWithEmailAndPassword(auth, email, senha)
      .catch(err => alert('Erro: ' + err.message));
  };

  const logout = () => signOut(auth);

  if (!user) {
    return (
      <main className="min-h-screen bg-gray-900 text-white flex items-center justify-center flex-col gap-4">
        <h1 className="text-2xl font-bold">Login</h1>
        <input className="px-4 py-2 rounded text-black" type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
        <input className="px-4 py-2 rounded text-black" type="password" placeholder="Senha" value={senha} onChange={e => setSenha(e.target.value)} />
        <button className="bg-green-600 px-6 py-2 rounded" onClick={login}>Entrar</button>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-900 text-white p-8">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Painel de Apostas</h1>
        <button className="bg-red-600 px-4 py-2 rounded" onClick={logout}>Sair</button>
      </div>
      <p>Bem-vindo, {user.email}</p>
      {/* Aqui futuramente: formulário, gráfico, tabela de apostas */}
    </main>
  );
}
